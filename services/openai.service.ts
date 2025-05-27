import Configuration, { OpenAIApi, ChatCompletionRequestMessage } from "openai";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export const askOpenAI = async (messages: ChatCompletionRequestMessage[]) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });
  return response.data.choices[0].message?.content;
};
