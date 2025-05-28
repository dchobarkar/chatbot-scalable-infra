import express from "express";
import dotenv from "dotenv";

import { rateLimiter } from "middleware/rateLimiter";
import { metricsMiddleware } from "metrics/prometheus";
import router from "routes/chatbot.route";
import { logger } from "@utils/logger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(rateLimiter);
app.use("/api/chat", router);

app.get("/metrics", metricsMiddleware);

app.listen(port, () => {
  logger.info(`Chatbot server running at http://localhost:${port}`);
});
