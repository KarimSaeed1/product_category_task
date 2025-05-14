import app from "./app.js";
import { env } from "./config/index.js";
const PORT = env.PORT;
const APP_URL = env.APP_URL;
// Start Server
app.listen(PORT, () => {
    console.log(`🚀🚀 ${APP_URL} 🚀🚀`);
});
