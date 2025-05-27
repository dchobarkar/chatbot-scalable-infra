import { Request, Response } from "express";

import { fetchSimilarMessages, storeMessage } from "./memory.service";
import { askOpenAI } from "./openai.service";

export const handleChatRequest = async (req: Request, res: Response) => {
  const agentId = req.params.agentId;
  const sessionId = req.headers["x-session-id"] as string;
  const userMessage = req.body.message;

  if (!agentMap[agentId]) {
    return res.status(404).json({ error: "Agent not found" });
  }

  const history = await fetchSimilarMessages(sessionId, userMessage);
  const prompt = [
    ...agentMap[agentId],
    ...history.map((h) => ({ role: h.role, content: h.content })),
    { role: "user", content: userMessage },
  ];

  try {
    const reply = await askOpenAI(prompt);
    await storeMessage(sessionId, "user", userMessage);
    await storeMessage(sessionId, "assistant", reply);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "Failed to process message" });
  }
};
