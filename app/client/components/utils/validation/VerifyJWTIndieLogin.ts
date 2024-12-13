import { parse } from "cookie";
import PostVerifyJWT from "../requests/PostVerifyJWT";

interface PropType {
  request: Request;
}

function VerifyJWT({ request }: PropType) {
  const JWT_SECRET = process.env.JWT_SECRET;

  // Check if JWT_SECRET exists
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set.");
  }

  // Get cookies from the request
  const cookieHeader = request.headers.get("Cookie");

  // Parse cookies using a parsing library like 'cookie'
  const cookies = cookieHeader ? parse(cookieHeader) : {};

  // Retrieve the JWT token from cookies
  const jwtToken = cookies.jwt;

  // If no JWT token exists, return empty response
  if (!jwtToken) {
    return null;
  }

  const base64Url = jwtToken.replace(/-/g, "+").replace(/_/g, "/");
  const base64 = base64Url + "==";
  const decodedToken = Buffer.from(base64, "base64").toString("utf-8");
  const tokenWithoutQuotes = decodedToken.replace(/^"([^"]*)"$/, "$1");

  return PostVerifyJWT({ token: tokenWithoutQuotes });
}

export default VerifyJWT