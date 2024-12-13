
import submissionAPI from "../../../../client/components/api/submissionAPI";

interface PropType {
  usernameInUrl: string;
  title: string;
  description: string;
}

async function PostIndieDevHeaderForm({ usernameInUrl, title, description }: PropType) {
   

   // Upload header title and description to database
   const response = await submissionAPI.post(`/update-indie-header`, {
    data: { username: usernameInUrl, title, description },
  });
  if (response.status === 200) {
    return new Response(
      JSON.stringify({
        message:
          "Header (title, description) has been processed and uploaded successfully!",
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
        error:
          "Internal Server Error: Failed to upload header title and description!",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export default PostIndieDevHeaderForm