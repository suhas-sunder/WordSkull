import { redirect } from "react-router-dom";
import accountAPI from "../../../../client/components/api/accountAPI";
import { createCookie, CookieOptions } from "@remix-run/node";
import ProcessTryCatchErrors from "../errors/ProcessErrors";

interface PropType {
  username: string;
  password: string;
}

async function PostIndieLogin({ username, password }: PropType) {
  try {
    // Define shared cookie options
    const cookieOptions: CookieOptions = {
      httpOnly: true, // Keep the cookie secure and inaccessible to client-side scripts
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV === "production", // Set secure flag for production
      sameSite: "strict", // Must match the union type
      path: "/", // Path for the cookie
    };

    // Create cookies with shared options
    const jwtCookie = createCookie("jwt", cookieOptions);

    // Make the POST request to your API
    const response = await accountAPI.post("/login-indie-dev", {
      data: { username, password },
    });

    const token = response.data.jwt_token;

    if (response.status === 200 && token) {
      // Serialize the cookies
      const jwtSerialized = await jwtCookie.serialize(token);

      // Create a Headers object and add both Set-Cookie headers
      const headers = new Headers();
      headers.append("Set-Cookie", jwtSerialized);

      // Return the response with the headers
      return redirect(`/edit-indie-game/${username}`, { headers });
    }

    return { error: "Login Request failed. Please try again." };
  } catch (error) {
    return ProcessTryCatchErrors({
      error,
      customError:
        "Internal Server Error: Something went wrong. Form submission failed.",
      status: 500,
    });
  }
}

export default PostIndieLogin;
