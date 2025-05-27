import { Router } from "express";

import { handleChatRequest } from "@services/agentManager.service";
import { Request, Response, NextFunction } from "express";

const router = Router();
router.post("/:agentId", (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(handleChatRequest(req, res)).catch(next);
});

export default router;
