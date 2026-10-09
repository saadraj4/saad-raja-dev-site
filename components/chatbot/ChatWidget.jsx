"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiX,
  FiSend,
  FiTrash2,
  FiZap,
  FiCornerDownLeft,
  FiUser,
} from "react-icons/fi";
import MarkdownRenderer from "./MarkdownRenderer";

const SUGGESTED_QUESTIONS = [
  "What is your tech stack?",
  "Show me your featured projects",
  "Are you available for new work?",
  "How can I contact Saad?",
];

const INITIAL_WELCOME_MESSAGE = {
  id: "welcome-msg",
  role: "assistant",
  content:
    "Hi there! 👋 I'm **Saad's AI Assistant**.\n\nFeel free to ask me anything about Saad's experience, full-stack skills, live projects, or availability. How can I help you today?",
  timestamp: "Just now",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  const scrollToBottom = useCallback((behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("auto");
      // Focus input when opened on desktop
      if (typeof window !== "undefined" && window.innerWidth >= 640) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    scrollToBottom("smooth");
  }, [messages, isLoading, scrollToBottom]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClearChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setError(null);
    setIsLoading(false);
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    setError(null);
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    const assistantMessageId = `assistant-${Date.now()}`;
    const assistantPlaceholder = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, assistantPlaceholder]);

    // Prepare history for API
    const apiPayloadMessages = updatedMessages
      .filter((m) => m.id !== "welcome-msg")
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiPayloadMessages }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        let errMessage = "Something went wrong, please try again or email Saad directly.";
        try {
          const errData = await response.json();
          if (errData?.error) {
            errMessage = errData.error;
          }
        } catch {
          // Fallback if not JSON
        }
        throw new Error(errMessage);
      }

      if (!response.body) {
        throw new Error("No response stream available.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamedContent += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: streamedContent }
              : msg
          )
        );
      }
    } catch (err) {
      if (err?.name === "AbortError") {
        return;
      }
      const errorMsg =
        err?.message || "Something went wrong, please try again or email Saad directly.";

      setError(errorMsg);

      // If nothing streamed, remove empty assistant placeholder or populate with friendly error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
              ...msg,
              content:
                msg.content ||
                "⚠️ Sorry, I ran into an issue getting that answer. Please feel free to email Saad at [saadahmedraja1@gmail.com](mailto:saadahmedraja1@gmail.com).",
            }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center gap-2 rounded-full p-3 sm:px-4 sm:py-2.5 shadow-xl transition-all duration-300 ${isOpen
            ? "bg-slate-900 text-white"
            : "bg-gradient-to-r from-blue-600 via-indigo-600 to-accent text-white hover:shadow-blue-500/25"
            }`}
          aria-label={isOpen ? "Close Chatbot" : "Open Saad's AI Chatbot"}
          aria-expanded={isOpen}
          id="chatbot-toggle-button"
        >
          {isOpen ? (
            <FiX className="w-5 h-5" />
          ) : (
            <>
              <div className="relative flex items-center justify-center">
                <FiZap className="w-4 h-4 text-yellow-300 animate-pulse" />
                <FiMessageSquare className="w-4 h-4 ml-1 hidden sm:block" />
              </div>
              <span className="hidden sm:inline font-semibold text-xs tracking-wide">
                Chat with Saad&apos;s AI
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Chat Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-header-title"
            className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 w-full h-full sm:w-[350px] sm:h-[490px] sm:max-h-[80vh] bg-white dark:bg-slate-900 border-0 sm:border sm:border-slate-200 dark:border-slate-800 rounded-none sm:rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-accent text-white select-none">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
                    <FiZap className="w-3.5 h-3.5 text-yellow-300" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-indigo-700 rounded-full" />
                </div>
                <div>
                  <h3
                    id="chatbot-header-title"
                    className="font-bold text-xs leading-tight text-white flex items-center gap-1"
                  >
                    Saad&apos;s AI Assistant
                  </h3>
                  <p className="text-[10px] text-white/80">Skills, projects & availability</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <button
                    onClick={handleClearChat}
                    title="Clear Conversation"
                    aria-label="Clear Conversation"
                    className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  aria-label="Close Chat"
                  className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2.5 bg-slate-50/70 dark:bg-slate-950/50 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.35)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-1.5 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-[10px] font-bold border border-blue-200 dark:border-blue-900">
                        ⚡
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-[13px] shadow-xs break-words overflow-hidden ${isUser
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none"
                        : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-bl-none"
                        }`}
                    >
                      {msg.content ? (
                        <MarkdownRenderer content={msg.content} />
                      ) : isLoading && !isUser ? (
                        <div className="flex items-center gap-1 py-1 px-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      ) : null}

                      <span
                        className={`block text-[9.5px] mt-0.5 text-right ${isUser ? "text-white/60" : "text-slate-400"
                          }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>

                    {isUser && (
                      <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0 text-[10px]">
                        <FiUser className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Suggested Questions (Visible when only welcome message exists) */}
              {messages.length === 1 && (
                <div className="pt-1.5">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 px-0.5">
                    Suggested Questions:
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="text-left text-xs bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-xs flex items-center justify-between group"
                      >
                        <span className="truncate pr-1">{q}</span>
                        <FiCornerDownLeft className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Alert Display */}
              {error && (
                <div className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg text-red-600 dark:text-red-400 text-xs leading-relaxed">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer */}
            <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-end gap-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg p-1.5 border border-slate-200 dark:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors"
              >
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`;
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Saad..."
                  rows={1}
                  maxLength={500}
                  disabled={isLoading}
                  className="flex-1 bg-transparent border-0 resize-none px-2 py-1 text-xs leading-relaxed text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none max-h-20 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] disabled:opacity-50"
                  aria-label="Message Saad's AI Assistant"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  className="w-7 h-7 mb-0.5 rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white transition-all flex items-center justify-center flex-shrink-0 disabled:cursor-not-allowed shadow-xs"
                >
                  <FiSend className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="flex items-center justify-between px-0.5 mt-1 text-[9.5px] text-slate-400">
                <span>Press Enter to send</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
