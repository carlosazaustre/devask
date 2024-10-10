export interface Question {
  id: string;
  title: string;
  tags: string[];
  votes: number;
  views: number;
  answers: number;
  author: string;
  timeAgo: string;
  content: string; // Ensure this is included and not optional
  replies?: Reply[];
}

export interface Reply {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface CodeBlockProps {
  language?: string;
  code: string;
}

export interface CodeBlockElement {
  type: "code";
  language?: string;
  code: string;
}

export interface TextElement {
  type: "text";
  content: string;
}

export interface InlineCodeElement {
  type: "inline";
  code: string;
}

// A unified type to represent all possible content elements
export type ContentElement = TextElement | CodeBlockElement | InlineCodeElement;
