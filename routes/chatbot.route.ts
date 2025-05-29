import { Router } from "express";
import { Request, Response } from "express";

import { messageQueue } from "queue/messageQueue";
import { getAgentById } from "@services/agentRegistry";
import { logger } from "@utils/logger";

const router = Router();

router.post("/:agentId", async (req: Request, res: Response) => {
  const { agentId } = req.params;
  const { message, sessionId } = req.body;
  const agent = getAgentById(agentId);

  if (!agent) return res.status(404).json({ error: "Agent not found" });

  try {
    await messageQueue.add("process-message", {
      agentId,
      sessionId,
      userMessage: message,
    });

    res.json({ status: "queued" });
  } catch (e) {
    logger.error("Failed to queue message", { error: e });
    res.status(500).json({ error: "Failed to queue message" });
  }
});

export default router;
