import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { TavilySearch } from "@langchain/tavily";
import { createAgent } from "langchain";
import { InMemoryStore } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";

dotenv.config();

const searchWeb = new TavilySearch({
    maxResults: 5,
    maxRetries: 3,
    topic: "general",
    apiKey: process.env.TAVILY_API_KEY,
});

const checkpointer = new MemorySaver();

const model = new ChatGroq({
    model: "openai/gpt-oss-20b",
    temperature: 0,
});

const agent = createAgent({
    model: model,
    tools: [searchWeb],
    store: new InMemoryStore(),
    checkpointer: checkpointer,
    systemPrompt: `You are Grok Assistant - a helpful, truthful research AI.

CRITICAL RULES:
1. ALWAYS use search for current events, news, stats, facts after 2023
2. Cite sources with [1], [2] format and list at end
3. Be concise but thorough
4. Say "I don't know" when uncertain
5. Format code in \`\`\` blocks

When to search:
✅ Current events/news
✅ Statistics/facts
✅ Product prices/availability
✅ Company info
✅ Technical specs

When NOT to search:
❌ Opinions/philosophy
❌ Math calculations
❌ Code generation
❌ Historical events pre-2023`,
});

export { agent };