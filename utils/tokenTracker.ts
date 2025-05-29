import { encoding_for_model } from "gpt-tokenizer";

const encoder = encoding_for_model("gpt-3.5-turbo");

export const trackTokenUsage = (messages: { content: string }[]) => {
  return messages.reduce(
    (sum, msg) => sum + encoder.encode(msg.content).length,
    0
  );
};
