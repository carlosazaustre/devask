import {
  Client,
  GatewayIntentBits,
  ThreadChannel,
  ChannelType,
} from "discord.js";
import { Question } from "@/types";

const FORUM_CHANNEL_TYPE = ChannelType.GuildForum;
const THREAD_CHANNEL_TYPE = 11;

/**
 * Fetches posts from a specified Discord forum channel.
 *
 * @returns {Promise<Question[]>} A promise that resolves to an array of questions.
 *
 * @throws Will throw an error if the specified channel is not a forum channel or if there is an issue fetching the posts.
 */
export async function fetchDiscordPosts(): Promise<Question[]> {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  try {
    await client.login(process.env.DISCORD_BOT_TOKEN);

    const channel = await client.channels.fetch(
      process.env.FORUM_CHANNEL_ID || ""
    );

    if (!channel || channel.type !== FORUM_CHANNEL_TYPE) {
      console.error(
        "The specified channel is not a forum channel or cannot be accessed"
      );
      return []; // Return an empty array instead of throwing an error
    }

    const threads = await channel.threads.fetchActive();

    const posts: Question[] = await Promise.all(
      threads.threads.map(async (thread) => {
        const messages = await thread.messages.fetch({ limit: 1 });
        const firstMessage = messages.first();

        return {
          id: thread.id,
          title: thread.name || "Untitled",
          tags: thread.appliedTags || [],
          votes: thread.messageCount || 0,
          views: "viewCount" in thread ? Number(thread.viewCount) : 0,
          answers: Math.max(0, (thread.messageCount || 1) - 1),
          author: firstMessage?.author?.username || "Unknown",
          timeAgo: thread.createdAt
            ? new Date(thread.createdAt).toLocaleString()
            : "Unknown date",
          content: firstMessage?.content || "",
        };
      })
    );

    return posts;
  } catch (error) {
    console.error("Error fetching Discord posts:", error);
    return []; // Return an empty array in case of any error
  } finally {
    await client.destroy();
  }
}

/**
 * Fetches a Discord thread by its ID and returns a `Question` object containing
 * details about the thread.
 *
 * @param threadId - The ID of the Discord thread to fetch.
 * @returns A promise that resolves to a `Question` object containing details
 * about the thread, or `null` if the thread does not exist or an error occurs.
 *
 * @throws Will throw an error if the specified thread does not exist or is not
 * a public thread.
 */
export async function fetchDiscordThread(
  threadId: string
): Promise<Question | null> {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  try {
    await client.login(process.env.DISCORD_BOT_TOKEN);

    const thread = (await client.channels.fetch(threadId)) as ThreadChannel;

    if (!thread || thread.type !== THREAD_CHANNEL_TYPE) {
      // 11 is the type for public thread channels
      throw new Error(
        "The specified thread does not exist or is not a public thread"
      );
    }

    const messages = await thread.messages.fetch();
    const firstMessage = messages.first();

    if (!firstMessage) {
      throw new Error("No messages found in the thread");
    }

    const viewCount = "viewCount" in thread ? Number(thread.viewCount) : 0;
    const messageCount = thread.messageCount ?? 0;
    const createdAt = thread.createdAt
      ? new Date(thread.createdAt).toLocaleString()
      : "Unknown date";

    const replies: Reply[] = messages
      .filter((msg) => msg.id !== firstMessage.id)
      .map((msg) => ({
        id: msg.id,
        content: msg.content,
        author: msg.author.username,
        createdAt: msg.createdAt.toLocaleString(),
      }))
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    const question: Question = {
      id: thread.id,
      title: thread.name,
      tags: thread.appliedTags || [],
      votes: messageCount,
      views: viewCount,
      answers: Math.max(0, messageCount - 1),
      author: firstMessage?.author?.username || "Unknown",
      timeAgo: createdAt,
      content: firstMessage?.content || "",
      replies: replies,
    };

    return question;
  } catch (error) {
    console.error("Error fetching Discord thread:", error);
    return null;
  } finally {
    await client.destroy();
  }
}
