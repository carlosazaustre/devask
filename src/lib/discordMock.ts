// File: src/lib/discordMock.ts

import { Question, Reply } from "@/types";
import mockDataJson from "../mocks/discordData.json";

interface MockData {
  posts: Question[];
}

const mockData: MockData = mockDataJson as MockData;

const mockPosts: Question[] = mockData.posts.map((post) => ({
  ...post,
  timeAgo: new Date(post.timeAgo).toISOString(),
  replies: post?.replies?.map((reply) => ({
    ...reply,
    createdAt: new Date(reply.createdAt).toISOString(),
  })),
}));

export async function fetchDiscordPosts(): Promise<{
  activePosts: Question[];
  pastPosts: Question[];
}> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allPosts = JSON.parse(JSON.stringify(mockPosts));

  const midPoint = Math.ceil(allPosts.length / 2);

  return {
    activePosts: allPosts.slice(0, midPoint),
    pastPosts: allPosts.slice(midPoint),
  };
}

export async function fetchDiscordThread(
  threadId: string
): Promise<Question | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const thread = mockPosts.find((post) => post.id === threadId);
  return thread ? JSON.parse(JSON.stringify(thread)) : null;
}
