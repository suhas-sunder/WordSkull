import accountAPI from "../../../../client/components/api/accountAPI";

interface   PropType {
  token: string
}

async function PostVerifyJWT({ token }: PropType) {
  try {
    const response = await accountAPI.get("/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200 || !response.data.username) {
      return null;
    }

    return response.data.username;
  } catch (error) {
    return null;
  }
}


export default PostVerifyJWT