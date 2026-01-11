import { createRequestHandler } from "@remix-run/netlify";
import * as build from "../../build/server";

export const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});
