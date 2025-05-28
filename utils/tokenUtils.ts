import { get_encoding } from "gpt-tokenizer";

const encoder = get_encoding("gpt-3.5-turbo");

export const countTokens = (text: string): number => {
  return encoder.encode(text).length;
};
