import { ContentElement } from "@/types";

export function extractCodeBlocks(message: string): ContentElement[] {
  const blockCodeRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const inlineCodeRegex = /`([^`]+)`/g;
  const elements: ContentElement[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = blockCodeRegex.exec(message)) !== null) {
    const beforeCode = message.slice(lastIndex, match.index).trim();
    if (beforeCode) {
      elements.push({ type: "text", content: beforeCode });
    }
    elements.push({
      type: "code",
      language: match[1] || "plaintext",
      code: match[2].trim(),
    });
    lastIndex = blockCodeRegex.lastIndex;
  }

  const remainingContent = message.slice(lastIndex).trim();
  if (remainingContent) {
    let lastInlineIndex = 0;
    while ((match = inlineCodeRegex.exec(remainingContent)) !== null) {
      const beforeInline = remainingContent.slice(lastInlineIndex, match.index);
      if (beforeInline) {
        elements.push({ type: "text", content: beforeInline });
      }
      elements.push({
        type: "inline",
        code: match[1].trim(),
      });
      lastInlineIndex = inlineCodeRegex.lastIndex;
    }

    const afterInline = remainingContent.slice(lastInlineIndex);
    if (afterInline) {
      elements.push({ type: "text", content: afterInline });
    }
  }

  return elements;
}
