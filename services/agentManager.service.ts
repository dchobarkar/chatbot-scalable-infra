import { Request, Response } from "express";

import { supportAgentPrompt } from "@agents/supportAgents";
import { askOpenAI } from "./openai.service";

const agentMap: Record<string, any> = {
  support: supportAgentPrompt,
};

export const handleChatRequest = async (req: Request, res: Response) => {
  const agentId = req.params.agentId;
  const userMessage = req.body.message;

  if (!agentMap[agentId]) {
    return res.status(404).json({ error: "Agent not found" });
  }

  const prompt = [...agentMap[agentId], { role: "user", content: userMessage }];

  try {
    const reply = await askOpenAI(prompt);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "Failed to process message" });
  }
};
