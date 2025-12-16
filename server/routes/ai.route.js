import express, { Router } from "express";
import { chatWithAI, getAIHistory } from "../controllers/ai.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();

router.post("/chat", verifyJWT, chatWithAI);
router.get("/history", verifyJWT, getAIHistory);

export default router;