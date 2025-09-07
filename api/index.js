import app from "../src/server.js";
import serverless from "serverless-http";

export const handler = serverless(app);
