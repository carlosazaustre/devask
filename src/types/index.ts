export interface Question {
  id: number;
  title: string;
  content?: string;
  tags: string[];
  votes: number;
  views: number;
  answers: number;
  author: string;
  timeAgo: string;
}

export interface Answer {
  id: number;
  content: string;
  author: string;
  votes: number;
  timeAgo: string;
}
