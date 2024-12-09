import IndieGameArticlesForm from "../client/components/form/IndieGameArticlesForm";
import IndieGameDetailsForm from "../client/components/form/IndieGameDetailsForm";
import IndieGameLinksForm from "../client/components/form/IndieGameLinksForm";
import IndieGameSettingsForm from "../client/components/form/IndieGameSettingsForm";
import IndieGamesHeaderForm from "../client/components/form/IndieGamesHeaderForm";
import IndieGameYTForm from "../client/components/form/IndieGameYTForm";
import submissionAPI from "../client/components/api/submissionAPI";
import PostIndieDevImgToR2 from "../client/components/utils/requests/PostIndieDevImgToR2";
import sharp from "sharp";

import {
  ActionFunctionArgs,
  CookieOptions,
  createCookie,
  LoaderFunction,
} from "@remix-run/node";
import jwt from "jsonwebtoken";
import { parse } from "cookie"; // Import cookie parser
import { MyJwtPayload } from "../client/types/authTypes";
import { redirect, useActionData } from "react-router-dom";
import { useEffect } from "react";

interface ActionResponse {
  error?: string;
  message?: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    // Check if JWT_SECRET exists
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not set.");
    }

    const cookieHeader = request.headers.get("Cookie");

    const cookies = cookieHeader ? parse(cookieHeader) : {};

    const jwtToken = cookies.jwt;
    const username = cookies.username;

    if (!username || !jwtToken) {
      return redirect("/edit-indie-game");
    }

    const base64Username =
      username.replace(/-/g, "+").replace(/_/g, "/") + "==";

    // Decode the token (if you're manually decoding for logging or debugging purposes)
    const decodedUsername = Buffer.from(base64Username, "base64").toString(
      "utf-8"
    );

    const usernameWithoutQuotes = decodedUsername.replace(/^"([^"]*)"$/, "$1");

    // Get the current URL
    const currentUrl = new URL(request.url);
    const usernameInUrl = currentUrl.pathname.split("/").slice(-1)[0];

    console.log("usernameInUrl", usernameInUrl);
    if (usernameInUrl && usernameInUrl !== usernameWithoutQuotes) {
      // Redirect to the /403 route
      return redirect("/403");
    }

    // Handle potential Base64Url issues (JWT might be Base64Url encoded)
    const base64Url = jwtToken.replace(/-/g, "+").replace(/_/g, "/");
    const base64 = base64Url + "==";

    const decodedToken = Buffer.from(base64, "base64").toString("utf-8");

    // Ensure there are no additional quotes in the token string (remove surrounding quotes)
    const tokenWithoutQuotes = decodedToken.replace(/^"([^"]*)"$/, "$1");

    // Verify the JWT token using the secret (Ensure it's Base64Url decoded correctly)
    const decoded = jwt.verify(tokenWithoutQuotes, JWT_SECRET) as MyJwtPayload; // Verify the token and cast to MyJwtPayload

    const userid = decoded.user;

    console.log("User ID from JWT:", userid);

    //Fetch data from the server based on the userid and send it to the client

    return new Response(JSON.stringify({}), {
      status: 200, // Default status is 200 (OK), but you can adjust as needed
      headers: {
        "Content-Type": "application/json", // Ensure the response is treated as JSON
      },
    });
  } catch (error) {
    console.error("Error during loader:", error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log("formData", formData);
  const currentUrl = new URL(request.url);
  const usernameInUrl = currentUrl.pathname.split("/").slice(-1)[0] || "";

  if (!usernameInUrl) {
    return new Response(
      JSON.stringify({ error: "Username not found in URL" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const headerForm = formData.get("placeholder-indie-game-header");
  const linksForm = formData.get("placeholder-indie-game-links");
  const articleForm = formData.get("placeholder-indie-game-article");
  const detailsForm = formData.get("placeholder-indie-game-details");
  const settingsForm = formData.get("placeholder-indie-game-settings");
  const youtubeForm = formData.get("placeholder-indie-game-youtube");
  const headerImage = formData.get("main-header-img") as File;

  //Handle header title an description after image is successfully uploaded
  const postHeaderData = async () => {
    // Handle header form
    if (headerForm !== null) {
      const title = formData.get("game-name");
      const description = formData.get("brief-game-description");

      if (!title || !description) {
        return new Response(
          JSON.stringify({ error: "All fields are required" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      try {
        // Upload header title and description to database
        const response = await submissionAPI.post(`/update-indie-header`, {
          method: "POST",
          responseType: "arraybuffer",
          data: { username: usernameInUrl, title, description },
        });
        if (response.status === 200) {
          return new Response(
            JSON.stringify({
              message:
                "Header (title, description, and image) has been processed and uploaded successfully",
            }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          return new Response(
            JSON.stringify({
              error: "Failed to upload header title and description",
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      } catch (error) {
        console.error("Header data processing error:", error);
        return new Response(
          JSON.stringify({
            error: "Failed to upload header title and description",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }
  };

  // Handle header image upload to R2
  if (headerImage !== null) {
    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedFormats.includes(headerImage.type)) {
      return new Response(JSON.stringify({ error: "Invalid image format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    //For Cloudflare R2
    const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
    const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
    const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
    const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

    if (
      !R2_ACCOUNT_ID ||
      !R2_ACCESS_KEY_ID ||
      !R2_SECRET_ACCESS_KEY ||
      !R2_BUCKET_NAME
    ) {
      return {
        error:
          "Internal Server Error: Image upload credentials not properly configured.",
      };
    }

    const buffer = await headerImage.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    try {
      // Resize and compress the image
      const webpBuffer = await sharp(imageBuffer)
        .resize(640, 360, { fit: "cover" })
        .toFormat("webp", { quality: 80 }) // Adjust quality for desired compression
        .toBuffer();

      // Define the file path and key in R2 for the image
      const imageObjectKey = `header-img-for-indie-game-showcase.txt`;
      const imgType = "image/webp";

      // Upload the WebP image to R2 directly using HTTP request
      await PostIndieDevImgToR2({
        imageObjectKey,
        webpBuffer,
        imgType,
        usernameInUrl,
        R2_ACCOUNT_ID,
        R2_ACCESS_KEY_ID,
        R2_SECRET_ACCESS_KEY,
        R2_BUCKET_NAME,
      });

      // If the upload succeeds, store data in the database
      return await postHeaderData();
    } catch (error) {
      console.error("Image processing failed:", error);
      return new Response(
        JSON.stringify({ error: "Image processing failed" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  //Handle links form
  if (linksForm !== null) {
    //Import json file from r2 bucket if file exists in https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/wordskull/indiegames/${username}/game-data.json
    //If it exists, update it with urls. If not, create new.

    // Check for JSON file and handle upload
    return new Response(
      JSON.stringify({ message: "Form submitted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  //Handle article form
  if (articleForm !== null) {
    //Import json file from r2 bucket if file exists in https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/wordskull/indiegames/${username}/game-data.json
    //If it exists, update it with urls. If not, create new.
    return { message: "Form submitted successfully" };
  }

  //Handle details form
  if (detailsForm !== null) {
    const details = {
      developer: formData.get("developer") || "",
      publisher: formData.get("publisher") || "",
      genre: formData.get("genre") || "",
      platforms: formData.get("flatforms") || "",
      publishers: formData.get("publisher-name") || "",
      price: formData.get("price") || "",
      release: formData.get("release") || "",
      coop: formData.get("coop") || false,
      achievements: formData.get("achievements") || false,
      demo: formData.get("demo") || false,
      controller: formData.get("controller") || false,
      tags: formData.get("tags") || "",
    };

    try {
      // Upload header title and description to database
      const response = await submissionAPI.post(`/update-indie-header`, {
        method: "POST",
        responseType: "arraybuffer",
        data: { username: usernameInUrl, ...details },
      });
      if (response.status === 200) {
        return {
          message:
            "Additional game details processed and uploaded successfully",
        };
      } else {
        console.error("Additional game details upload failed");
        return new Response(
          JSON.stringify({ error: "Failed to upload additional game details" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    } catch (error) {
      console.error("Header data processing error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to upload additional game details" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  //Handle account settings form
  if (settingsForm !== null) {
    if (formData.get("logout") !== null) {
      // Define shared cookie options
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      };

      // Recreate cookies with matching attributes
      const jwtCookie = createCookie("jwt", cookieOptions);
      const usernameCookie = createCookie("username", cookieOptions);

      // Clear the cookies by setting `maxAge` to 0
      return redirect("/edit-indie-game", {
        headers: new Headers([
          ["Set-Cookie", await jwtCookie.serialize("", { maxAge: 0 })],
          ["Set-Cookie", await usernameCookie.serialize("", { maxAge: 0 })],
        ]),
      });
    } else if (formData.get("delete") !== null) {
      return new Response(
        JSON.stringify({ message: "Account deleted successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else if (formData.get("change-password") !== null) {
      return new Response(
        JSON.stringify({ message: "Password changed successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    //Save data to database
    return { message: "Form submitted successfully" };
  }

  //Handle youtube form
  if (youtubeForm !== null) {
    //Import json file from r2 bucket if file exists in https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/wordskull/indiegames/${username}/game-data.json
    //If it exists, update it with urls. If not, create new.
    return new Response(
      JSON.stringify({ message: "Form submitted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
  return new Response(
    JSON.stringify({ error: "Something went wrong. Form submission failed." }),
    { status: 500, headers: { "Content-Type": "application/json" } }
  );
}

export default function EditIndieUsername() {
  const actionData = useActionData() as ActionResponse;

  useEffect(() => {
    console.log("actionData", actionData);
  }, [actionData]);

  return (
    <div className="flex flex-col w-full max-w-[800px] mx-auto tracking-wider px-5 mt-2">
      <IndieGamesHeaderForm actionData={actionData} />

      <IndieGameLinksForm />
      <IndieGameYTForm />
      <IndieGameDetailsForm />
      <IndieGameArticlesForm />
      <IndieGameSettingsForm />
    </div>
  );
}
