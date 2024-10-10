import { Question } from "@/types";
import * as discordMock from "./discordMock";
import * as discordProd from "./discordProd";

const isProduction = process.env.NODE_ENV === "production";

export async function fetchDiscordPosts(): Promise<{
  activePosts: Question[];
  pastPosts: Question[];
}> {
  return isProduction
    ? discordProd.fetchDiscordPosts()
    : discordMock.fetchDiscordPosts();
}

export async function fetchDiscordThread(
  threadId: string
): Promise<Question | null> {
  return isProduction
    ? discordProd.fetchDiscordThread(threadId)
    : discordMock.fetchDiscordThread(threadId);
}
