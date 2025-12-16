import asyncHandler from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";
import AIMessage from "../models/aiMessage.model.js";
import { agent } from "../utils/aiSetup.util.js";

const chatWithAI = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { message } = req.body;

    if (!message) {
        return next(new errorHandler("Message is required", 400));
    }

    try {
        const response = await agent.invoke({
            messages: [{ role: "user", content: message }],
        }, { configurable: { thread_id: userId } });

        const lastMessage = response.messages[response.messages.length - 1];
        const aiResponse = lastMessage.content;

        // Store the conversation
        const aiMessage = await AIMessage.create({
            userId,
            userMessage: message,
            aiResponse,
        });

        return res.status(200).json({
            success: true,
            data: {
                userMessage: message,
                aiResponse,
            },
        });
    } catch (error) {
        console.error("AI Error:", error);
        return next(new errorHandler("Failed to get AI response", 500));
    }
});

const getAIHistory = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const history = await AIMessage.find({ userId }).sort({ createdAt: 1 });

    return res.status(200).json({
        success: true,
        data: history,
    });
});

export { chatWithAI, getAIHistory };