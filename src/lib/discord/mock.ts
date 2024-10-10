import { Question } from "@/types";
import { DiscordApi } from "./types";
import mockData from "../../mocks/discordData.json";

export const fetchDiscordPosts: DiscordApi["fetchDiscordPosts"] = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allPosts = JSON.parse(JSON.stringify(mockData.posts)) as Question[];

  const midPoint = Math.ceil(allPosts.length / 2);

  return {
    activePosts: allPosts.slice(0, midPoint),
    pastPosts: allPosts.slice(midPoint),
  };
};

export const fetchDiscordThread: DiscordApi["fetchDiscordThread"] = async (
  threadId: string
) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const thread = mockData.posts.find(
    (post) => post.id === threadId
  ) as Question;

  return thread ? JSON.parse(JSON.stringify(thread)) : null;
};
