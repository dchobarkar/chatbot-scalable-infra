import { Router } from "express";
import { Request, Response } from "express";

import { getAgentById } from "@services/agentRegistry";

const router = Router();

router.post("/:agentId", async (req: Request, res: Response) => {
  const { agentId } = req.params;
  const { message, sessionId } = req.body;
  const agent = getAgentById(agentId);

  if (!agent) return res.status(404).json({ error: "Agent not found" });

  try {
    const reply = await agent.processMessage(message, sessionId);
    res.json({ reply });
  } catch (e) {
    res.status(500).json({ error: "Failed to process message" });
  }
});

export default router;
