import validation from "./validation.js";
import jwt from "jsonwebtoken";

const { sanitize, validateString } = validation();

//Generate JWT token for the provided user ID.
function jwtGenerator(user_id) {
  try {
    // Validate input
    validateString(user_id, "User ID");

    const payload = {
      user: sanitize(user_id),
    };

    const jwtSecret = process.env.JWT_SECRET;
    const sessionExp = process.env.SESSION_EXP;

    if (!jwtSecret || !sessionExp) {
      throw new Error(
        "JWT_SECRET and SESSION_EXP must be defined in the environment variables."
      );
    }

    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: sessionExp,
    });

    return token;
  } catch (error) {
    // Handle errors
    console.error("JWT generation error:", error);
    throw new Error("Failed to generate JWT token");
  }
}

export default jwtGenerator;
