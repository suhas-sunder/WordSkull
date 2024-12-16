interface PropType {
  linkForYT: string;
}

// Function to validate and transform YouTube links
export default function validateAndTransformYouTubeLink({
  linkForYT,
}: PropType) {
  // Validate it's a YouTube URL and extract the video ID
  const videoIdRegex = /(?:v=|\/v\/|youtu\.be\/|\/embed\/)([\w\\-]{11})/;
  const videoIdMatch = linkForYT.match(videoIdRegex);

  if (!videoIdMatch) {
    // Reject if no valid video ID is found
    return { error: "Invalid YouTube URL. Please provide a valid link." };
  }

  // Extract the video ID
  const videoId = videoIdMatch[1];

  // Create the normalized embed link
  const embedLink = `https://www.youtube.com/embed/${videoId}`;

  return { embedLink };
}
