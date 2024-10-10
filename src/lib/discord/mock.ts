import { Question } from "@/types";
import { DiscordApi } from "./types";
import mockData from "../../mocks/discordData.json";

/**
 * Fetches Mock Discord posts and divides them into active and past posts.
 *
 * This function simulates an asynchronous fetch operation by waiting for 500 milliseconds.
 * It then processes mock data to separate the posts into two categories:
 * active posts and past posts.
 *
 * @returns An object containing two arrays:
 * - `activePosts`: The first half of the posts.
 * - `pastPosts`: The second half of the posts.
 */
export const fetchDiscordPosts: DiscordApi["fetchDiscordPosts"] = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allPosts = JSON.parse(JSON.stringify(mockData.posts)) as Question[];

  const midPoint = Math.ceil(allPosts.length / 2);

  return {
    activePosts: allPosts.slice(0, midPoint),
    pastPosts: allPosts.slice(midPoint),
  };
};

/**
 * Fetches a Mock Discord thread by its ID.
 *
 * This function simulates a delay of 300 milliseconds to mimic an asynchronous
 * API call. It searches for a thread within the `mockData.posts` array that matches
 * the provided `threadId`. If a matching thread is found, it returns a deep copy
 * of the thread object. If no matching thread is found, it returns `null`.
 *
 * @param threadId - The ID of the Discord thread to fetch.
 * @returns A promise that resolves to the thread object if found, or `null` if not found.
 */
export const fetchDiscordThread: DiscordApi["fetchDiscordThread"] = async (
  threadId: string
) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const thread = mockData.posts.find(
    (post) => post.id === threadId
  ) as Question;

  return thread ? JSON.parse(JSON.stringify(thread)) : null;
};
