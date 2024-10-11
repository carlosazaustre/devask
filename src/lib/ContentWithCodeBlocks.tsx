import React from "react";
import { extractCodeBlocks } from "@/lib/codeUtils";
import CodeBlock from "@/components/CodeBlock";
import { ContentElement } from "@/types";

const ContentWithCodeBlocks = ({ content }: { content: string }) => {
  const elements: ContentElement[] = extractCodeBlocks(content);

  return (
    <div>
      {elements.map((element, index) => {
        if (element.type === "text") {
          return (
            <span className="text-gray-700" key={`text-${index}`}>
              {element.content}
            </span>
          );
        } else if (element.type === "code") {
          return (
            <div className="my-4" key={`code-${index}`}>
              <CodeBlock language={element.language} code={element.code} />
            </div>
          );
        } else if (element.type === "inline") {
          return (
            <code key={`inline-code-${index}`} className="bg-gray-200 px-2 py-0.5 rounded">
              {element.code}
            </code>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ContentWithCodeBlocks;
