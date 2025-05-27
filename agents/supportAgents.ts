export interface ChatCompletionRequestMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const supportAgentPrompt: ChatCompletionRequestMessage[] = [
  {
    role: "system",
    content:
      "You are a friendly customer support agent. Answer questions politely and clearly.",
  },
];
