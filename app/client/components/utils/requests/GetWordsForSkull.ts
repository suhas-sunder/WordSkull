import ProcessErrors from "../errors/ProcessErrors";
import cloudflareR2API from "../../../../client/components/api/cloudflareR2API";
import { ungzip } from "pako";

//Fetch list of words for WordSkull game from Cloudflare R2
export default async function GetWordsForSkull() {
  try {
    let words = {};

    // Fetch gzipped file from Cloudflare R2 if not cached
    const response = await cloudflareR2API.get(
      "/words-for-games/sortedWords.json.gz",
      {
        method: "GET",
        responseType: "arraybuffer",
      }
    );

    const responseData = new Uint8Array(response.data);

    // Check if the response data is Gzipped
    const isGzip = responseData[0] === 0x1f && responseData[1] === 0x8b;

    if (isGzip) {
      const decompressedData = ungzip(responseData, { to: "string" });
      words = JSON.parse(decompressedData);
    } else {
      const textData = new TextDecoder().decode(responseData);
      words = JSON.parse(textData);
    }

    return new Response(
      JSON.stringify({ words }), // Return the 'words' object as a JSON string
      {
        status: 200, // Default status is 200 OK
        headers: {
          "Content-Type": "application/json", // Ensure the content type is JSON
          "Cache-Control": "max-age=3600, public", // Cache settings
        },
      }
    );
  } catch (error) {
    console.error("Error fetching or decompressing words data:", error);
    return ProcessErrors({
      error,
      customError: "Error fetching or decompressing words data",
      status: 500,
    });
  }
}
