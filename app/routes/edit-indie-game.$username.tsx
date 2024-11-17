import IndieGameArticlesForm from "../client/components/form/IndieGameArticlesForm";
import IndieGameDetailsForm from "../client/components/form/IndieGameDetailsForm";
import IndieGameLinksForm from "../client/components/form/IndieGameLinksForm";
import IndieGameSettingsForm from "../client/components/form/IndieGameSettingsForm";
import IndieGamesHeaderForm from "../client/components/form/IndieGamesHeaderForm";
import IndieGameYTForm from "../client/components/form/IndieGameYTForm";
import sharp from "sharp";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import { ActionFunctionArgs, json, LoaderFunction } from "@remix-run/node";
import jwt from "jsonwebtoken";
import { parse } from "cookie"; // Import cookie parser
import { MyJwtPayload } from "../client/types/authTypes";
import { redirect } from "react-router-dom";

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

    return json({});
  } catch (error) {
    console.error("Error during loader:", error);
    return json({ error: "An error occurred" }, { status: 500 });
  }
};

async function uploadToR2(
  key: string,
  body: Buffer,
  contentType: string,
  username: string
) {
  // Function to generate x-amz-date timestamp in the required format for Cloudflare R2
  function getFormattedTimestamp(): string {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = now.getUTCDate().toString().padStart(2, "0");
    const hours = now.getUTCHours().toString().padStart(2, "0");
    const minutes = now.getUTCMinutes().toString().padStart(2, "0");
    const seconds = now.getUTCSeconds().toString().padStart(2, "0");

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  }

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
    throw new Error("R2 environment variables are not properly configured.");
  }

  // Configure the AWS SDK S3 client for Cloudflare R2
  const s3Client = new S3Client({
    region: "auto", // Cloudflare R2 doesn't require a specific region, so 'auto' works
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true, // Required for R2 compatibility
  });

  // Specify the folder structure
  const folderPath = `wordskull/indiegames/${username}/`;
  const fullKey = `${folderPath}${key}`; // Add the file name to the folder path

  // Prepare the headers, including the R2 credentials and x-amz-date
  const xAmzDate = getFormattedTimestamp();

  // Create the parameters for the PutObjectCommand
  const params = {
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: fullKey,
    Body: body,
    ContentType: contentType,
    Metadata: {
      "x-amz-date": xAmzDate,
    },
  };

  try {
    // Perform the upload using the S3 client
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    // Log the response for debugging
    console.log("Upload success:", response);
    return response;
  } catch (error) {
    console.error("Error during upload:", error);
    throw new Error(`Upload failed: ${error}`);
  }
}

async function fetchFromR2(key: string, username: string) {
  // Function to generate x-amz-date timestamp in the required format for Cloudflare R2
  function getFormattedTimestamp(): string {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = now.getUTCDate().toString().padStart(2, "0");
    const hours = now.getUTCHours().toString().padStart(2, "0");
    const minutes = now.getUTCMinutes().toString().padStart(2, "0");
    const seconds = now.getUTCSeconds().toString().padStart(2, "0");

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  }

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
    throw new Error("R2 environment variables are not properly configured.");
  }

  // Configure the AWS SDK S3 client for Cloudflare R2
  const s3Client = new S3Client({
    region: "auto", // Cloudflare R2 doesn't require a specific region, so 'auto' works
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true, // Required for R2 compatibility
  });

  // Specify the folder structure
  const folderPath = `wordskull/indiegames/${username}/game-data.json`;
  const fullKey = `${folderPath}${key}`; // Add the file name to the folder path

  // Prepare the headers, including the R2 credentials and x-amz-date
  const xAmzDate = getFormattedTimestamp();

  // Create the parameters for the GetObjectCommand
  const params = {
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: fullKey,
    Metadata: {
      "x-amz-date": xAmzDate,
    },
  };

  try {
    // Perform the fetch using the S3 client
    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    // If the file exists, read and parse the JSON content
    if (response.Body) {
      // Convert the stream to string
      const bodyText = await streamToString(
        response.Body as ReadableStream<Uint8Array>
      );
      const jsonData = JSON.parse(bodyText); // Assuming it's a JSON file
      console.log("Fetched JSON data:", jsonData);
      return jsonData;
    } else {
      //If file doesn't exist return null so that we can create it
      return null;
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    throw new Error(`Fetch failed: ${error}`);
  }
}

// Helper function to convert a stream to string (for handling S3 body)
async function streamToString(
  stream: ReadableStream<Uint8Array>
): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) {
      chunks.push(value);
    }
    done = readerDone;
  }

  // Flatten the chunks array and convert it to a single Uint8Array
  const allBytes = new Uint8Array(chunks.flatMap((chunk) => Array.from(chunk)));

  // Decode the Uint8Array into a string
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(allBytes);
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log("formData", formData);
  const currentUrl = new URL(request.url);
  const usernameInUrl = currentUrl.pathname.split("/").slice(-1)[0] || "";

  if (!usernameInUrl) {
    return json({ error: "Username not found in URL" }, { status: 400 });
  }

  const headerForm = formData.get("placeholder-indie-game-header");
  const linksForm = formData.get("placeholder-indie-game-links");
  const articleForm = formData.get("placeholder-indie-game-article");
  const detailsForm = formData.get("placeholder-indie-game-details");
  const settingsForm = formData.get("placeholder-indie-game-settings");
  const youtubeForm = formData.get("placeholder-indie-game-youtube");

  // Handle header form
  if (headerForm !== null) {
    const headerTitle = formData.get("game-name") as File;
    const headerDescription = formData.get("brief-game-description") as File;
    const headerImage = formData.get("main-header-img") as File;

    if (!headerTitle || !headerDescription || !headerImage) {
      return json({ error: "All fields are required" }, { status: 400 });
    }

    const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedFormats.includes(headerImage.type)) {
      return json({ error: "Invalid image format" }, { status: 400 });
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
      const imageObjectKey = `header-img-for-indie-game-showcase.webp`;

      // Upload the WebP image to R2 directly using HTTP request
      await uploadToR2(imageObjectKey, webpBuffer, "image/webp", usernameInUrl);

      //Upload title and description to database

      // Check for JSON file and handle upload
      // const jsonFile = formData.get("game-data-json") as File;

      // if (jsonFile) {
      //   try {
      //     // Parse the JSON file content
      //     const jsonBuffer = await jsonFile.arrayBuffer();
      //     const jsonContent = Buffer.from(jsonBuffer);

      //     // Define the file path and key for the JSON
      //     const jsonObjectKey = `username-header-img`;

      //     // Upload the JSON file to R2 directly using HTTP request
      //     await uploadToR2(jsonObjectKey, jsonContent, "application/json");
      //     console.log("JSON file successfully uploaded to R2:", jsonObjectKey);
      //   } catch (jsonError) {
      //     console.error("JSON file processing failed:", jsonError);
      //     return json(
      //       { error: "JSON file processing failed" },
      //       { status: 500 }
      //     );
      //   }
      // }

      return json({
        message: "Image and JSON processed and uploaded successfully",
      });
    } catch (error) {
      console.error("Image processing failed:", error);
      return json({ error: "Image processing failed" }, { status: 500 });
    }
  }

  //Handle links form
  if (linksForm !== null) {
    //Import json file from r2 bucket if file exists in https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/wordskull/indiegames/${username}/game-data.json
    //If it exists, update it with urls. If not, create new.

    return json({ message: "Form submitted successfully" });
  }

  //Handle article form
  if (articleForm !== null) {
    //Import json file from r2 bucket if file exists in https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/wordskull/indiegames/${username}/game-data.json
    //If it exists, update it with urls. If not, create new.

    return json({ message: "Form submitted successfully" });
  }

  //Handle details form
  if (detailsForm !== null) {
    //Save data to database
    return json({ message: "Form submitted successfully" });
  }

  //Handle settings form
  if (settingsForm !== null) {
    //Save data to database
    return json({ message: "Form submitted successfully" });
  }

  //Handle youtube form
  if (youtubeForm !== null) {
    //Import json file from r2 bucket if file exists in https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/wordskull/indiegames/${username}/game-data.json
    //If it exists, update it with urls. If not, create new.
    return json({ message: "Form submitted successfully" });
  }
  return json(
    { error: "Something went wrong. Form submission failed. " },
    { status: 500 }
  );
}

export default function EditIndieUsername() {
  return (
    <div className="flex flex-col w-full max-w-[800px] mx-auto tracking-wider px-5 mt-2">
      <IndieGamesHeaderForm />
      <IndieGameLinksForm />
      <IndieGameYTForm />
      <IndieGameDetailsForm />
      <IndieGameArticlesForm />
      <IndieGameSettingsForm />
    </div>
  );
}
