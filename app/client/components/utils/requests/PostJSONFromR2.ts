import { PutObjectCommand } from "@aws-sdk/client-s3";
import GetS3Client from "../../api/GetS3Client";
import ValidateJSON from "../validation/ValidateJson";
import GeneratexAmzDate from "../generators/GeneratexAmzDate";

interface PropType {
  objectKey: string;
  usernameInUrl: string;
  R2_ACCOUNT_ID: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  R2_BUCKET_NAME: string;
  jsonData: Record<string, unknown>; // The JSON data to upload
}

async function PostJSONToR2({
  usernameInUrl,
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
  objectKey,
  jsonData,
}: PropType) {
  if (
    !R2_ACCOUNT_ID ||
    !R2_ACCESS_KEY_ID ||
    !R2_SECRET_ACCESS_KEY ||
    !R2_BUCKET_NAME
  ) {
    throw new Error("R2 environment variables are not properly configured.");
  }

  ValidateJSON(jsonData);

  const s3Client = await GetS3Client({
    R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
  });

  // Specify the folder structure
  const folderPath = `indiegamedevs/${usernameInUrl}/`;
  const fullKey = `${folderPath}${objectKey}`; // Add the file name to the folder path

  const xAmzDate = GeneratexAmzDate();

  try {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fullKey,
      Body: JSON.stringify(jsonData), // Convert the JSON data to a string
      ContentType: "application/json", // Specify the content type for JSON
      Metadata: {
        "x-amz-date": xAmzDate,
      },
    });

    const response = await s3Client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      return { error: "Failed to upload JSON data to R2." };
    }

    return { message: "Congratulations! Upload or update successful!" };
  } catch (error) {
    console.error("Error during upload:", error);
    throw new Error(`Upload failed: ${error}`);
  }
}

export default PostJSONToR2;
