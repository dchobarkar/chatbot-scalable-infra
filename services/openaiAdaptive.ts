import { OpenAIApi, Configuration } from "openai";

import { trackTokenUsage } from "@utils/tokenTracker";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export const askAdaptiveModel = async (
  messages: { content: string; role: string }[],
  preferQuality = false
) => {
  const tokenEstimate = trackTokenUsage(messages);
  const model =
    tokenEstimate > 3500 && !preferQuality ? "gpt-3.5-turbo" : "gpt-4";
  const response = await openai.createChatCompletion({ model, messages });
  return response.data.choices[0].message?.content || "";
};
