export interface Question {
  id: number;
  title: string;
  tags: string[];
  votes: number;
  views: number;
  answers: number;
  author: string;
  timeAgo: string;
}
