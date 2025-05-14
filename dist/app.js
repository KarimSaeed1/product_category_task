import express from "express";
import { errorHandler, notFoundHandler, apiVersion, graphqlParser } from "./middleware/index.js";
import apollo from "./apollo.js";
// Define Express App
const app = express();
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(graphqlParser);
// Version
app.use("/version", apiVersion);
// Start GraphQL Server
await apollo(app);
// Handlers
app.use("*", notFoundHandler);
app.use(errorHandler);
export default app;
