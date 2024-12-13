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
} from "@remix-run/node";
import { redirect, useActionData } from "react-router-dom";
import ProcessTryCatchErrors from "../client/components/utils/errors/ProcessTryCatchErrors";
import PostIndieDevHeaderForm from "../client/components/utils/requests/PostIndieDevHeaderForm";
import GetIndieDevJson from "../client/components/utils/requests/GetIndieDevJson";

interface ActionResponse {
  error?: string;
  message?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const currentUrl = new URL(request.url);
  const usernameInUrl = currentUrl.pathname.split("/").slice(-1)[0] || "";

  if (!usernameInUrl) {
    return { error: "Username not found in URL" };
  }

  //Placeholder input used to identify which form is being submitted. This way I can check for mandatory fields related to each form after the form is identified.
  const headerForm = formData.get("placeholder-indie-game-header");
  const linksForm = formData.get("placeholder-indie-game-links");
  const articleForm = formData.get("placeholder-indie-game-article");
  const detailsForm = formData.get("placeholder-indie-game-details");
  const settingsForm = formData.get("placeholder-indie-game-settings");
  const youtubeForm = formData.get("placeholder-indie-game-youtube");
  const headerImage = formData.get("main-header-img") as File;

  //Get IndieDev json template from R2
  const jsonData = await GetIndieDevJson({ username: usernameInUrl }); //Default json template if one doesn't already exist in R2

  console.log(jsonData);

  // Handle header image upload to R2
  if (headerImage !== null && headerForm !== null) {
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

    const title = formData.get("game-name")?.toString();
    const description = formData.get("brief-game-description")?.toString();

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

      // If the upload succeeds, store data in the database

      // Handle header form
      try {
        const result = await PostIndieDevHeaderForm({
          usernameInUrl,
          title,
          description,
        });

        // Check if the first request was successful
        if (!result || result?.status !== 200) {
          // Handle failure: Do not proceed with the second upload
          return result;
        }
      } catch (error) {
        return ProcessTryCatchErrors({
          error,
          customError:
            "Something went wrong: Failed to upload header title and description",
          status: 500,
        });
      }
      // Upload the WebP image to R2 directly using HTTP request
      return await PostIndieDevImgToR2({
        imageObjectKey,
        webpBuffer,
        imgType,
        usernameInUrl,
        R2_ACCOUNT_ID,
        R2_ACCESS_KEY_ID,
        R2_SECRET_ACCESS_KEY,
        R2_BUCKET_NAME,
      });
    } catch (error) {
      return ProcessTryCatchErrors({
        error,
        customError: "Something went wrong: Header form submission failed.",
        status: 500,
      });
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
          JSON.stringify({
            error:
              "Internal Server Error: Failed to upload additional game details",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    } catch (error) {
      return ProcessTryCatchErrors({
        error,
        customError:
          "Something went wrong. Failed to submit additional game details.",
        status: 500,
      });
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
      // return new Response(
      //   JSON.stringify({ message: "Account deleted successfully" }),
      //   { status: 200, headers: { "Content-Type": "application/json" } }
      // );
    } else if (formData.get("change-password") !== null) {
      // return new Response(
      //   JSON.stringify({ message: "Password changed successfully" }),
      //   { status: 200, headers: { "Content-Type": "application/json" } }
      // );
    }

    return new Response(
      JSON.stringify({
        error: "Something went wrong. Failed to submit account settings form.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
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

  //If none of the above forms are submitted, return an error
  return new Response(
    JSON.stringify({
      error: "Something went wrong. All form submissions failed.",
    }),
    { status: 500, headers: { "Content-Type": "application/json" } }
  );
}

export default function EditIndieUsername() {
  const actionData = useActionData() as ActionResponse;

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
