"use client";

import React from "react";

/**
 * Lightweight, zero-dependency Markdown renderer for chatbot responses.
 * Supports:
 * - Bold (**text**)
 * - Italic (*text*)
 * - Inline Code (`code`)
 * - Links ([text](url)) with target="_blank" and rel="noopener noreferrer"
 * - Bullet lists (- item or * item)
 * - Numbered lists (1. item)
 * - Paragraph breaks
 */
export function MarkdownRenderer({ content }) {
  if (!content) return null;

  // Parse lines into blocks (paragraphs vs lists)
  const lines = content.split("\n");
  const blocks = [];
  let currentList = null;

  const flushList = () => {
    if (currentList) {
      if (currentList.type === "ul") {
        blocks.push(
          <ul key={`ul-${blocks.length}`} className="list-disc list-outside pl-5 my-1.5 space-y-1">
            {currentList.items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {renderInlineFormatting(item)}
              </li>
            ))}
          </ul>
        );
      } else {
        blocks.push(
          <ol key={`ol-${blocks.length}`} className="list-decimal list-outside pl-5 my-1.5 space-y-1">
            {currentList.items.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {renderInlineFormatting(item)}
              </li>
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    // Unordered list item (- or *)
    const ulMatch = line.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(ulMatch[1]);
      continue;
    }

    // Ordered list item (1. 2. etc.)
    const olMatch = line.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(olMatch[1]);
      continue;
    }

    // Standard paragraph line
    flushList();
    blocks.push(
      <p key={`p-${blocks.length}`} className="my-1.5 first:mt-0 last:mb-0 leading-relaxed">
        {renderInlineFormatting(line)}
      </p>
    );
  }

  flushList();

  return <div className="text-sm leading-relaxed space-y-1">{blocks}</div>;
}

/**
 * Handles inline formatting: bold, italic, code, links
 */
function renderInlineFormatting(text) {
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;

  const nodes = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(text)) !== null) {
    const matchIndex = match.index;

    // Push preceding plain text
    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    const fullMatch = match[0];

    if (fullMatch.startsWith("[") && match[2] && match[3]) {
      // Link [text](url)
      const label = match[2];
      const url = match[3];
      nodes.push(
        <a
          key={`link-${matchIndex}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline font-medium hover:text-blue-600 transition-colors"
        >
          {label}
        </a>
      );
    } else if (fullMatch.startsWith("**") && match[4]) {
      // Bold **text**
      nodes.push(
        <strong key={`bold-${matchIndex}`} className="font-bold text-ink">
          {match[4]}
        </strong>
      );
    } else if (fullMatch.startsWith("`") && match[5]) {
      // Code `code`
      nodes.push(
        <code
          key={`code-${matchIndex}`}
          className="px-1.5 py-0.5 text-xs bg-bg-soft border border-line rounded text-accent font-mono"
        >
          {match[5]}
        </code>
      );
    } else if (fullMatch.startsWith("*") && match[6]) {
      // Italic *text*
      nodes.push(
        <em key={`italic-${matchIndex}`} className="italic">
          {match[6]}
        </em>
      );
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  // Push remaining plain text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

export default MarkdownRenderer;
