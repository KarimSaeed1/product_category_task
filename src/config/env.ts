import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Load .env file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..","..", ".env") });

export default {
    // Env Values
    PORT: process.env.APP_PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    APP_URL: process.env.APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    GRAPHQL_PATH: process.env.GRAPHQL_PATH,
};