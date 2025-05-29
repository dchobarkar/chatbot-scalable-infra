import fs from "fs";
import Configuration, { OpenAIApi, ChatCompletionRequestMessage } from "openai";

import { getCachedResponse, setCachedResponse } from "./cache.service";
import { trackTokenUsage } from "@utils/tokenTracker";
import { logger } from "@utils/logger";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export const askOpenAI = async (messages: ChatCompletionRequestMessage[]) => {
  const promptKey = JSON.stringify(messages);
  const cached = await getCachedResponse(promptKey);
  if (cached) return cached;
  const tokenCount = trackTokenUsage(messages);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });

  const reply = response.data.choices[0].message?.content || "";
  await setCachedResponse(promptKey, reply);

  // log to file
  const entry = { timestamp: Date.now(), tokens: tokenCount };
  fs.appendFileSync("./token-logs.json", JSON.stringify(entry) + "\n");

  logger.info("Token Usage", { tokenCount });

  return reply;
};
