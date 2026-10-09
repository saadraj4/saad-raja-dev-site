import { streamText } from "ai";
import { NextResponse } from "next/server";
import { getChatModel } from "@/lib/chatbot-model";
import { getChatbotSystemPrompt } from "@/lib/chatbot-system-prompt";
import { checkRateLimit } from "@/lib/rate-limit";

// Maximum limits for security and cost control
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 20;
const MAX_OUTPUT_TOKENS = 600;

export const runtime = "nodejs";

export async function POST(req) {
  try {
    // 1. Same-Origin Verification (Security Check)
    const host = req.headers.get("host") || "";
    const origin = req.headers.get("origin");

    if (process.env.NODE_ENV === "production" && origin) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return NextResponse.json(
            { error: "Unauthorized request origin." },
            { status: 403 }
          );
        }
      } catch {
        // Invalid origin format
        return NextResponse.json(
          { error: "Invalid request origin." },
          { status: 403 }
        );
      }
    }

    // 2. IP Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwarded ? forwarded.split(",")[0].trim() : realIp || "127.0.0.1";

    const rateLimit = await checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: rateLimit.message || "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 3. Request Body Parsing & Validation
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Request body must contain a 'messages' array." },
        { status: 400 }
      );
    }

    const rawMessages = body.messages;

    if (rawMessages.length === 0) {
      return NextResponse.json(
        { error: "Messages array cannot be empty." },
        { status: 400 }
      );
    }

    // Sanitize and trim messages
    const sanitizedMessages = [];

    for (const msg of rawMessages) {
      if (!msg || typeof msg !== "object") continue;
      const role = msg.role;
      const content = msg.content;

      if ((role === "user" || role === "assistant") && typeof content === "string") {
        const cleanContent = content.trim();
        if (cleanContent.length > 0) {
          // Truncate overly long individual messages
          const truncated =
            cleanContent.length > MAX_MESSAGE_LENGTH
              ? cleanContent.slice(0, MAX_MESSAGE_LENGTH) + "..."
              : cleanContent;

          sanitizedMessages.push({
            role,
            content: truncated,
          });
        }
      }
    }

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: "No valid user or assistant messages found." },
        { status: 400 }
      );
    }

    // Keep only the most recent N messages of conversation history
    const trimmedMessages =
      sanitizedMessages.length > MAX_HISTORY_MESSAGES
        ? sanitizedMessages.slice(-MAX_HISTORY_MESSAGES)
        : sanitizedMessages;

    // 4. API Key Verification (Groq or Google Gemini)
    const hasKey = Boolean(
      process.env.GROQ_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.GOOGLE_API_KEY
    );

    if (!hasKey) {
      return NextResponse.json(
        {
          error:
            "Chatbot service is currently not configured with an API key. Please contact Saad directly at saadahmedraja1@gmail.com.",
        },
        { status: 503 }
      );
    }

    // 5. Call AI SDK streamText with Gemini Flash
    const model = getChatModel();
    const systemPrompt = getChatbotSystemPrompt();

    const result = streamText({
      model,
      system: systemPrompt,
      messages: trimmedMessages,
      maxTokens: MAX_OUTPUT_TOKENS,
      temperature: 0.2, // Strict factual adherence to ground truth
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in /api/chat route:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong while processing your request. Please try again or email Saad at saadahmedraja1@gmail.com.",
      },
      { status: 500 }
    );
  }
}
