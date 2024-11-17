/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./config.env" });

const JWT_SECRET = process.env.JWT_SECRET || ""; // Fallback value for JWT secret

const unauthorizedError = (res) => {
  return res.status(403).json({ error: "Unauthorized. Access denied!" });
};

// Middleware function
const authenticate = async (req, res, next) => {
  const authHeader = req.header("Authorization") || "";

  if (!authHeader.startsWith("Bearer ")) {
    return unauthorizedError(res);
  }

  const token = authHeader.substring(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET); // Adjust the payload type if needed

    // Attach user info to the request object
    req.user = payload.user;

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

export default authenticate;
