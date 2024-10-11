import { describe, it, expect } from "vitest";
import { extractCodeBlocks } from "./codeUtils";

describe("extractCodeBlocks", () => {
  it("should extract a single code block with language and text before/after", () => {
    const message = `
      Here is some text.
      \`\`\`js
      console.log('hello world');
      \`\`\`
      More text after code.
    `;

    const result = extractCodeBlocks(message);

    expect(result).toEqual([
      { type: "text", content: "Here is some text." },
      {
        type: "code",
        language: "js",
        code: "console.log('hello world');",
      },
      { type: "text", content: "More text after code." },
    ]);
  });

  it("should extract multiple code blocks with text between and their associated language", () => {
    const message = `
      Here is some text.
      \`\`\`js
      console.log('hello world');
      \`\`\`
      Another text.
      \`\`\`python
      print('hello world')
      \`\`\`
    `;

    const result = extractCodeBlocks(message);

    expect(result).toEqual([
      { type: "text", content: "Here is some text." },
      {
        type: "code",
        language: "js",
        code: "console.log('hello world');",
      },
      { type: "text", content: "Another text." },
      {
        type: "code",
        language: "python",
        code: "print('hello world')",
      },
    ]);
  });

  it("should handle code blocks with no specified language and text before/after", () => {
    const message = `
      Here is some text.
      \`\`\`
      console.log('hello world');
      \`\`\`
    `;

    const result = extractCodeBlocks(message);

    expect(result).toEqual([
      { type: "text", content: "Here is some text." },
      {
        type: "code",
        language: "plaintext",
        code: "console.log('hello world');",
      },
    ]);
  });

  it("should handle text with no code blocks", () => {
    const message = "Just some text without code blocks.";

    const result = extractCodeBlocks(message);

    expect(result).toEqual([{ type: "text", content: "Just some text without code blocks." }]);
  });

  it("should handle edge cases with empty code blocks and text before/after", () => {
    const message = `
      Here is some text.
      \`\`\`js
      \`\`\`
    `;

    const result = extractCodeBlocks(message);

    expect(result).toEqual([
      { type: "text", content: "Here is some text." },
      {
        type: "code",
        language: "js",
        code: "",
      },
    ]);
  });

  it("should handle inline code", () => {
    const message = "Here is some inline code: `git push -u origin main`.";

    const result = extractCodeBlocks(message);

    expect(result).toEqual([
      { type: "text", content: "Here is some inline code: " },
      {
        type: "inline",
        code: "git push -u origin main",
      },
      { type: "text", content: "." },
    ]);
  });
});
