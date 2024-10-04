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

export interface Answer {
  id: number;
  content: string;
  author: string;
  votes: number;
  timeAgo: string;
}
