import { PutObjectCommand } from "@aws-sdk/client-s3";
import GetS3Client from "../../api/GetS3Client";
import GeneratexAmzDate from "../generators/GeneratexAmzDate";

interface PropType {
  imageObjectKey: string;
  webpBuffer: Buffer;
  imgType: string;
  usernameInUrl: string;
  R2_ACCOUNT_ID: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  R2_BUCKET_NAME: string;
}

export default async function PostIndieDevImgToR2({
  webpBuffer,
  imgType,
  imageObjectKey,
  usernameInUrl,
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
}: PropType) {
  const s3Client = await GetS3Client({
    R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
  });

  // Specify the folder structure
  const folderPath = `indiegamedevs/${usernameInUrl}/`;
  const fullKey = `${folderPath}${imageObjectKey}`; // Add the file name to the folder path

  const xAmzDate = GeneratexAmzDate();

  // Create the parameters for the PutObjectCommand
  const params = {
    Bucket: R2_BUCKET_NAME!,
    Key: fullKey,
    Body: webpBuffer,
    ContentType: imgType,
    ContentLength: webpBuffer.length, // Explicitly set ContentLength to disable multipart
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
