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
}

export interface Answer {
  id: number;
  content: string;
  author: string;
  votes: number;
  timeAgo: string;
}
