import { S3Client } from "@aws-sdk/client-s3";

let s3Client: S3Client | null = null;

interface PropType {
  R2_ACCOUNT_ID: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
}

//Setup S3 Client for Cloudflare R2
export default function GetS3Client({
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
}: PropType) {
  if (s3Client) {
    // If client is already initialized, log the message and return the existing client
    console.log("S3 Client already initialized");
    return s3Client;
  }

  // Log the start of initialization
  console.log("S3 Client Initialization Started");

  // Initialize the client
  s3Client = new S3Client({
    region: "auto", // Cloudflare R2 doesn't require a specific region
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true, // Required for R2 compatibility
    maxAttempts: 2, // Reduce retries to limit additional operations
  });

  // Log when initialization is complete
  console.log("S3 Client Initialized");

  return s3Client;
}
