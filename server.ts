import express from "express";
import dotenv from "dotenv";

import chatbotRoutes from "./routes/chatbot.route";
import { rateLimiter } from "./middleware/rateLimiter";
import { logger } from "./utils/logger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(rateLimiter);
app.use("/api/chat", chatbotRoutes);

app.listen(port, () => {
  logger.info(`Chatbot server running at http://localhost:${port}`);
});
