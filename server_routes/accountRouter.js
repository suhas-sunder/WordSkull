import express from "express";
import { pool } from "./config/dbConfig.js";
import validation from "./utils/validation.js";
import jwtGenerator from "./utils/jwtGenerator.js";
import authorization from "./middleware/authorization.js";
import bcrypt from "bcrypt";

const { sanitize, validateString } = validation();
const saltRound = 12;

const router = express.Router();

// Utility function for sanitizing inputs
// const sanitizeInput = (input) => {
//   return validator.escape(input);
// };

// Middleware to log request details (only in development)
// router.use((req, res, next) => {
//   if (process.env.NODE_ENV === "development") {
//     console.log(`Received ${req.method} request for ${req.url}`);
//   }
//   next();
// });

router.post("/register-indie-dev", async (req, res) => {
  try {
    const { username, secret, password } = req.body.data;

    // Validation and sanitization
    validateString(username, "Username");
    validateString(password, "Password");
    validateString(secret, "Username");

    // Sanitize inputs
    const sanitizedUsername = sanitize(username);
    const sanitizedPassword = sanitize(password);
    const sanitizedSecret = sanitize(secret);

    if (sanitizedSecret !== process.env.INDIE_DEV_SECRET_KEY) {
      return res.status(401).json("Invalid admin username!");
    }

    // Hash password
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);
    const hashedPasswordOverride = await bcrypt.hash(
      process.env.INDIE_DEV_SECRET_KEY,
      salt
    );

    const newUser = await pool.query(
      `INSERT INTO indiedevs (username, password, password_override) VALUES ($1, $2, $3) RETURNING *`,
      [sanitizedUsername, hashedPassword, hashedPasswordOverride]
    );

    console.log("newUser", newUser.rows[0]);

    if (!newUser)
      return res.status(500).json("Server Error: Failed to setup new user!");

    res.status(200).json({
      message: "User was successfully registered!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Internal Server Error: Unable to register user");
  }
});

router.post("/login-indie-dev", async (req, res) => {
  try {
    const { username, password } = req.body.data;

    // Validate input data
    if (!username || !password) {
      return res.status(401).json("Username and password are required!");
    }

    // Validate and sanitize input data
    validateString(username, "Username");
    validateString(password, "Password");

    const user = await pool.query(
      "SELECT * FROM indiedevs WHERE username = $1",
      [username]
    );

    // Check if user doesn't exist
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid username or password!");
    }

    // Compare hashed password with input password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    const validOverridePassword = await bcrypt.compare(
      password,
      user.rows[0].password_override
    );

    if (!validPassword && !validOverridePassword) {
      return res.status(401).json("Invalid username or password!");
    }

    // Generate JWT token
    const jwt_token = await jwtGenerator(user.rows[0].id);

    res.json({ jwt_token });
  } catch (err) {
    res.status(500).json("Internal Server Error: Failed to login");
  }
});

//Verify user login session via jwt token
router.get("/is-verify", authorization, async (req, res) => {
  try {
    // Extract user ID from the authorization token
    const userId = req.user;

    // Query the database to get user details
    const result = await pool.query(
      "SELECT username FROM indiedevs WHERE id = $1",
      [userId]
    );

    // Check if user details were found
    if (result.rows.length === 0) {
      return res.status(404).json("User not found");
    }

    // Extract user details from the query result
    const userName = result.rows[0].username;

    // Respond with user details and verification status
    res.json({ verified: true, userId, userName });
  } catch (err) {
    res.status(500).json("Internal Server Error: Failed to verify user");
  }
});

router.post("/logout", async (req, res) => {
  try {
    //Eventually perform any cleanup operations here based on forget me settings (e.g., clearing session data)
    // Respond with a JSON indicating successful logout
    res.json({ success: true });
  } catch (err) {
    // Handle any errors that might occur during the logout process
    res.status(500).json({
      success: false,
      message: "Failed to logout. Internal Server Error",
    });
  }
});

router.all("*", async (res) => {
  res.status(404).json({
    timestamp: Date.now(),
    msg: "No route matches your request",
    code: 404,
  });
});

export default router;
