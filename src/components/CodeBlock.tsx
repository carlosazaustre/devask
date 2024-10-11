import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism"; // light theme
import { CodeBlockProps } from "@/types";

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language={language} style={prism}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
