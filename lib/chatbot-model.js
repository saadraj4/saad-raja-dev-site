import { createGroq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

/**
 * Model provider configuration for the portfolio chatbot.
 * 
 * Supports:
 * 1. Groq (Default if GROQ_API_KEY is present): Ultra-fast, 100% free with no credit card.
 *    Available Models: "openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.8-27b"
 * 
 * 2. Google Gemini: Fallback if GOOGLE_GENERATIVE_AI_API_KEY is present.
 */
export function getChatModel() {
  const groqApiKey = (process.env.GROQ_API_KEY || "").replace(/['"]/g, "").trim();
  const googleApiKey = (
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ""
  ).replace(/['"]/g, "").trim();

  // Use Groq if key is available
  if (groqApiKey) {
    const groq = createGroq({
      apiKey: groqApiKey,
    });
    const modelName = process.env.GROQ_CHAT_MODEL || "openai/gpt-oss-120b";
    return groq(modelName);
  }

  // Otherwise fallback to Google Gemini
  const google = createGoogleGenerativeAI({
    apiKey: googleApiKey,
  });
  const modelName = process.env.GOOGLE_CHAT_MODEL || "gemini-1.5-flash";
  return google(modelName);
}
