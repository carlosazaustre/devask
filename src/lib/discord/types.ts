import { Question } from "@/types";

export interface DiscordApi {
  fetchDiscordPosts: () => Promise<{
    activePosts: Question[];
    pastPosts: Question[];
  }>;
  fetchDiscordThread: (threadId: string) => Promise<Question | null>;
}
