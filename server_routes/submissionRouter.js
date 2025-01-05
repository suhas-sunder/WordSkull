import express from "express";
import { pool } from "./config/dbConfig.js";
import validator from "validator";

const router = express.Router();

const validateRequestBody = (fields, body) => {
  for (const field of fields) {
    if (!body[field]) {
      return { error: `${field} is required` };
    }
    if (typeof body[field] !== "string") {
      return { error: `${field} must be a string` };
    }
  }
  return null;
};


// Middleware to log request details (only in development)
router.use((req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Received ${req.method} request for ${req.url}`);
  }
  next();
});


// Utility function for sanitizing inputs
const sanitizeInput = (input) => {
  return validator.escape(input).trim();
};

router.get("/indie-games-data", async(req, res) => {
  try {
    const { username } = req.body.data;


    // Validate input
    const validationError = validateRequestBody(
      ["username"],
      req.body.data
    );

    if (validationError) {
      console.log(validationError.error);
      return res.status(400).json({ error: validationError.error });
    }

    // Sanitize input
    const sanitizeUsername = sanitizeInput(username);
    
    console.log(sanitizeUsername);

    const result = await pool.query(
      "GET * FROM indiedevs WHERE username = $1",
      [sanitizeUsername.trim()]
    );


    if (result.rowCount === 0) {
      console.log("Error: Failed to fetch indie dev data for username");
      return res.status(404).json({ error: "Failed to fetch indie dev data for username" });
    }

    res.status(200).json({ message: "Data fetched successfully!" });
  } catch {
    console.error("Update Indie Header Error:", err.message);
    res.status(500).json({ error: "Server Error: Could fetch indie games data from server!" });
  }
})


router.post("/update-indie-header", async (req, res) => {
  try {
    const { username, title, description } = req.body.data;

    // Validate input
    const validationError = validateRequestBody(
      ["username", "title", "description"],
      req.body.data
    );

    if (validationError) {
      console.log(validationError.error);
      return res.status(400).json({ error: validationError.error });
    }

    // Sanitize input
    const sanitizeUsername = sanitizeInput(username);
    const sanitizeTitle = sanitizeInput(title);
    const sanitizeDescription = sanitizeInput(description);
    console.log(sanitizeUsername, sanitizeTitle, sanitizeDescription);

    // Update database
    const result = await pool.query(
      `UPDATE indiedevs
       SET game_title = $2, game_description = $3
       WHERE username = $1
       RETURNING *`,
      [sanitizeUsername, sanitizeTitle, sanitizeDescription]
    );


    if (result.rowCount === 0) {
      console.log("Error: username not found");
      return res.status(404).json({ error: "username not found" });
    }

    res.status(200).json({ message: "Header details updated successfully!" });
  } catch (err) {
    console.error("Update Indie Header Error:", err.message);
    res.status(500).json({ error: "Server Error: Could not update header!" });
  }
});



export default router;
