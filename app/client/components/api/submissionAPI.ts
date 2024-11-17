import axios from "axios";
import { ActionFunctionArgs } from "react-router-dom";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log("formData", formData);
}

// Determine the base URL based on environment variables
const baseURL =
  import.meta.env.MODE === "production"
    ? `https://wordskull.com/v1/api/submission`
    : `http://localhost:${import.meta.env.VITE_PORT || 3200}/v1/api/submission`;

const instance = axios.create({
  baseURL,
  timeout: 30000,
});

export default instance;
