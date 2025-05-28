import { Agent } from "types/Agent";
import { askOpenAI } from "@services/openai.service";
import { fetchSimilarMessages, storeMessage } from "@services/memory.service";

export const supportAgent: Agent = {
  id: "support",
  label: "Support Bot",
  systemPrompt: "You are a helpful support assistant.",

  async processMessage(userMessage, sessionId) {
    const history = await fetchSimilarMessages(sessionId, userMessage);
    const messages = [
      { role: "system", content: this.systemPrompt },
      ...history.map((h: { role: any; content: any }) => ({
        role: h.role,
        content: h.content,
      })),
      { role: "user", content: userMessage },
    ];

    const reply = await askOpenAI(messages);

    await storeMessage(sessionId, "user", userMessage);
    await storeMessage(sessionId, "assistant", reply);

    return reply;
  },
};
