import express from "express";
import { pool } from "./config/dbConfig.js";
// import validator from "validator";

const router = express.Router();

// Utility function for sanitizing inputs
// const sanitizeInput = (input) => {
//   return validator.escape(input);
// };

// Middleware to log request details (only in development)
router.use((req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Received ${req.method} request for ${req.url}`);
  }
  next();
});

router.get("/view-count", async (req, res) => {
  try {
    const { username } = req.query; // Use query parameters for GET requests

    // Validate the input
    if (!username) {
      return res.status(400).json({ error: "username is required" });
    }

    if (typeof username !== "string") {
      return res.status(400).json({ error: "username must be a string" });
    }

    // Fetch the page_views for the given username
    const response = await pool.query(
      "SELECT page_views FROM indiedevs WHERE username = $1",
      [username]
    );

    if (response.rowCount === 0) {
      return res.status(404).json({ error: "username not found" });
    }

    // Log the fetched result (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log("Fetched view count:", response.rows[0]);
    }

    // Return the page_views value
    res.status(200).json({ page_views: response.rows[0].page_views });
  } catch (err) {
    console.error("Error fetching view count:", err.message);
    res.status(500).json({ error: "Server Error: Could not get view count!" });
  }
});

router.post("/view-count", async (req, res) => {
  try {
    const { username } = req.body;

    // Validate the input
    if (!username) {
      return res.status(400).json({ error: "username is required" });
    }

    if (typeof username !== "string") {
      return res.status(400).json({ error: "username must be a string" });
    }

    // Increment the page_views column for the specified username
    const result = await pool.query(
      `UPDATE indiedevs
       SET page_views = COALESCE(page_views, 0) + 1
       WHERE username = $1
       RETURNING *`,
      [username]
    );

    // Check if the username exists in the table
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "username not found" });
    }

    // Log the update (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log("View count updated:", result.rows[0]);
    }

    // Return the updated record
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Update View Count Error:", err.message);
    res
      .status(500)
      .json({ error: "Server Error: Could not update view count!" });
  }
});



export default router;
