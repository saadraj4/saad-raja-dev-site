import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Simple in-memory fallback for local development or when Upstash is not configured
const memoryStoreMinute = new Map();
const memoryStoreDay = new Map();

// Cleanup stale memory records periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of memoryStoreMinute.entries()) {
      if (now > value.resetTime) {
        memoryStoreMinute.delete(key);
      }
    }
    for (const [key, value] of memoryStoreDay.entries()) {
      if (now > value.resetTime) {
        memoryStoreDay.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

function checkMemoryRateLimit(store, identifier, limit, windowMs) {
  const now = Date.now();
  const record = store.get(identifier);

  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs;
    store.set(identifier, { count: 1, resetTime });
    return { success: true, reset: resetTime, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { success: false, reset: record.resetTime, remaining: 0 };
  }

  record.count += 1;
  return { success: true, reset: record.resetTime, remaining: limit - record.count };
}

// Initialize Upstash if environment variables exist
const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

let upstashMinuteLimiter = null;
let upstashDayLimiter = null;

if (hasUpstash) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    upstashMinuteLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      analytics: true,
      prefix: "saad_portfolio_chat_min",
    });

    upstashDayLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(50, "1 d"),
      analytics: true,
      prefix: "saad_portfolio_chat_day",
    });
  } catch (error) {
    console.warn("Failed to initialize Upstash Redis rate limiter, using in-memory fallback.", error);
  }
}

/**
 * Checks rate limits for a given IP address:
 * - 10 requests per minute
 * - 50 requests per day
 */
export async function checkRateLimit(ip) {
  const cleanIp = ip || "127.0.0.1";

  // Use Upstash if available
  if (upstashMinuteLimiter && upstashDayLimiter) {
    try {
      const [minuteRes, dayRes] = await Promise.all([
        upstashMinuteLimiter.limit(cleanIp),
        upstashDayLimiter.limit(cleanIp),
      ]);

      if (!minuteRes.success) {
        return {
          success: false,
          message: "You're sending messages a bit too fast. Please wait a moment before trying again.",
          reset: minuteRes.reset,
          remaining: minuteRes.remaining,
        };
      }

      if (!dayRes.success) {
        return {
          success: false,
          message: "Daily message limit reached. Please feel free to email Saad directly at saadahmedraja1@gmail.com!",
          reset: dayRes.reset,
          remaining: dayRes.remaining,
        };
      }

      return {
        success: true,
        remaining: Math.min(minuteRes.remaining, dayRes.remaining),
      };
    } catch (error) {
      console.warn("Upstash rate limit error, falling back to memory:", error);
    }
  }

  // Fallback: In-memory rate limiting
  const minuteLimit = checkMemoryRateLimit(memoryStoreMinute, cleanIp, 10, 60 * 1000);
  if (!minuteLimit.success) {
    return {
      success: false,
      message: "You're sending messages a bit too fast. Please wait a minute before trying again.",
      reset: minuteLimit.reset,
      remaining: minuteLimit.remaining,
    };
  }

  const dayLimit = checkMemoryRateLimit(memoryStoreDay, cleanIp, 50, 24 * 60 * 60 * 1000);
  if (!dayLimit.success) {
    return {
      success: false,
      message: "Daily message limit reached. Please feel free to email Saad directly at saadahmedraja1@gmail.com!",
      reset: dayLimit.reset,
      remaining: dayLimit.remaining,
    };
  }

  return {
    success: true,
    remaining: Math.min(minuteLimit.remaining, dayLimit.remaining),
  };
}
