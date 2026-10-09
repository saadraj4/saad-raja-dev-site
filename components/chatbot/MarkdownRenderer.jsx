"use client";

import React from "react";

/**
 * Lightweight Markdown renderer for chatbot responses.
 * Supports:
 * - Headings (#, ##, ###)
 * - Horizontal rules (---)
 * - Tables (| col | col |)
 * - Bold (**text**)
 * - Italic (*text*)
 * - Inline Code (`code`)
 * - Links ([text](url))
 * - Bullet lists (- item or * item)
 * - Numbered lists (1. item)
 * - Paragraph breaks
 */
export function MarkdownRenderer({ content }) {
  if (!content) return null;

  const lines = content.split("\n");
  const blocks = [];
  let currentList = null;
  let currentTable = null;

  const flushList = () => {
    if (currentList) {
      if (currentList.type === "ul") {
        blocks.push(
          <ul key={`ul-${blocks.length}`} className="list-disc list-outside pl-4 my-1.5 space-y-1">
            {currentList.items.map((item, i) => (
              <li key={i} className="leading-snug break-words">
                {renderInlineFormatting(item)}
              </li>
            ))}
          </ul>
        );
      } else {
        blocks.push(
          <ol key={`ol-${blocks.length}`} className="list-decimal list-outside pl-4 my-1.5 space-y-1">
            {currentList.items.map((item, i) => (
              <li key={i} className="leading-snug break-words">
                {renderInlineFormatting(item)}
              </li>
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  const flushTable = () => {
    if (currentTable && currentTable.rows.length > 0) {
      const headerRow = currentTable.headers;
      const dataRows = currentTable.rows;

      blocks.push(
        <div key={`table-${blocks.length}`} className="overflow-x-auto my-2 rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-xs text-left border-collapse">
            {headerRow && (
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  {headerRow.map((cell, idx) => (
                    <th key={idx} className="p-1.5 px-2">
                      {renderInlineFormatting(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-1.5 px-2 text-slate-600 dark:text-slate-300">
                      {renderInlineFormatting(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushList();
      flushTable();
      continue;
    }

    // Horizontal Rule (--- or ***)
    if (/^[-*_]{3,}$/.test(line)) {
      flushList();
      flushTable();
      blocks.push(
        <hr key={`hr-${blocks.length}`} className="my-2 border-slate-200 dark:border-slate-800" />
      );
      continue;
    }

    // Markdown Table Row (| col1 | col2 |)
    if (line.startsWith("|") && line.endsWith("|")) {
      flushList();
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());

      // Check if it's a separator line like |---|---|
      const isSeparator = cells.every((c) => /^:?-+:?$/.test(c));

      if (isSeparator) {
        continue;
      }

      if (!currentTable) {
        currentTable = { headers: cells, rows: [] };
      } else {
        currentTable.rows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    // Headings (# Heading, ## Subheading, ### Sub-subheading)
    const headingMatch = line.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      flushList();
      flushTable();
      const level = headingMatch[1].length;
      const title = headingMatch[2];

      blocks.push(
        <div
          key={`h-${blocks.length}`}
          className={`font-bold text-slate-900 dark:text-white mt-2 mb-1 ${
            level <= 2 ? "text-[13.5px] border-b border-slate-200 dark:border-slate-800 pb-0.5" : "text-[12.5px]"
          }`}
        >
          {renderInlineFormatting(title)}
        </div>
      );
      continue;
    }

    // Unordered list item (- or *)
    const ulMatch = line.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      flushTable();
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
      flushTable();
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(olMatch[1]);
      continue;
    }

    // Standard paragraph line
    flushList();
    flushTable();
    blocks.push(
      <p key={`p-${blocks.length}`} className="my-1 first:mt-0 last:mb-0 leading-relaxed break-words">
        {renderInlineFormatting(line)}
      </p>
    );
  }

  flushList();
  flushTable();

  return <div className="text-[13px] leading-relaxed space-y-1 break-words">{blocks}</div>;
}

/**
 * Handles inline formatting: bold, italic, code, links
 */
function renderInlineFormatting(text) {
  if (typeof text !== "string") return text;
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
          className="text-blue-500 hover:text-blue-400 underline font-medium transition-colors break-all"
        >
          {label}
        </a>
      );
    } else if (fullMatch.startsWith("**") && match[4]) {
      // Bold **text**
      nodes.push(
        <strong key={`bold-${matchIndex}`} className="font-semibold text-slate-900 dark:text-white">
          {match[4]}
        </strong>
      );
    } else if (fullMatch.startsWith("`") && match[5]) {
      // Code `code`
      nodes.push(
        <code
          key={`code-${matchIndex}`}
          className="px-1 py-0.5 text-[11px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-blue-600 dark:text-blue-400 font-mono break-all"
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
