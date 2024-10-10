import {
  Client,
  GatewayIntentBits,
  ThreadChannel,
  ForumChannel,
  ChannelType,
  ReadonlyCollection,
  AnyThreadChannel,
  Message,
} from "discord.js";
import { Question, Reply } from "@/types";
import { DiscordApi } from "./types";

const FORUM_CHANNEL_TYPE = ChannelType.GuildForum;
const THREAD_CHANNEL_TYPE = ChannelType.PublicThread;

// Factory function to create a Discord client
export const createDiscordClient = () =>
  new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

/**
 * Internal function
 *
 *  Extracts relevant information from a Discord thread to form a Question object.
 *
 * @param thread - The Discord thread to process.
 * @param messages - Collection of messages in the thread.
 * @returns A Question object containing thread details.
 */
function extractQuestionFromThread(
  thread: ThreadChannel<boolean>,
  messages: ReadonlyCollection<string, Message>
): Question {
  const firstMessage = messages.last();
  const viewCount = "viewCount" in thread ? Number(thread.viewCount) : 0;
  const messageCount = thread.messageCount ?? 0;

  const createdAt = thread.createdAt
    ? new Date(thread.createdAt).toLocaleString()
    : "Unknown date";

  const replies: Reply[] = messages
    .filter((msg) => msg.id !== firstMessage?.id)
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

  return {
    id: thread.id,
    title: thread.name || "Untitled",
    tags: "appliedTags" in thread ? thread.appliedTags : [],
    votes: messageCount,
    views: viewCount,
    answers: Math.max(0, messageCount - 1),
    author: firstMessage?.author?.username || "Unknown",
    timeAgo: createdAt,
    content: firstMessage?.content || "",
    replies: replies,
  };
}

/**
 * Internal function
 *
 * Processes a collection of Discord threads and extracts relevant information
 * to form an array of questions.
 *
 * @param threads - A collection of Discord threads to process.
 * @returns A promise that resolves to an array of questions.
 */
async function processThreads(
  threads: ReadonlyCollection<string, AnyThreadChannel>
): Promise<Question[]> {
  return Promise.all(
    Array.from(threads.values()).map(async (thread) => {
      const messages = await thread.messages.fetch({ limit: 100 });
      return extractQuestionFromThread(thread, messages);
    })
  );
}

/**
 * Fetches a Discord thread by its ID and extracts a question from it.
 *
 * @param threadId - The ID of the Discord thread to fetch.
 * @returns The extracted question from the thread, or null if an error occurs.
 *
 * @throws Will throw an error if the specified thread does not exist, is not a public thread,
 * or if no messages are found in the thread.
 */
export const fetchDiscordThread: DiscordApi["fetchDiscordThread"] = async (
  threadId: string
) => {
  const client = createDiscordClient();

  try {
    await client.login(process.env.DISCORD_BOT_TOKEN);

    const thread = (await client.channels.fetch(threadId)) as ThreadChannel;

    if (!thread || thread.type !== THREAD_CHANNEL_TYPE) {
      throw new Error(
        "The specified thread does not exist or is not a public thread"
      );
    }

    const messages = await thread.messages.fetch();

    if (messages.size === 0) {
      throw new Error("No messages found in the thread");
    }

    return extractQuestionFromThread(thread, messages);
  } catch (error) {
    console.error("Error fetching Discord thread:", error);
    return null;
  } finally {
    // await client.destroy();
  }
};

/**
 * Fetches active and past posts from a specified Discord forum channel.
 *
 * @returns {Promise<{ activePosts: any[], pastPosts: any[] }>} An object containing arrays of active and past posts.
 *
 * @throws Will throw an error if there is an issue logging in to the Discord client or fetching the channel/posts.
 *
 * @remarks
 * - The function logs in to the Discord client using the token provided in the environment variable `DISCORD_BOT_TOKEN`.
 * - It fetches the forum channel specified by the environment variable `FORUM_CHANNEL_ID`.
 * - If the channel is not a forum channel or cannot be accessed, it logs an error and returns empty arrays for active and past posts.
 * - It fetches active and archived threads from the forum channel and processes them into posts.
 * - The function ensures the Discord client is destroyed after execution, regardless of success or failure.
 */
export const fetchDiscordPosts: DiscordApi["fetchDiscordPosts"] = async () => {
  const client = createDiscordClient();

  try {
    await client.login(process.env.DISCORD_BOT_TOKEN);

    const channel = await client.channels.fetch(
      process.env.FORUM_CHANNEL_ID || ""
    );

    if (!channel || channel.type !== FORUM_CHANNEL_TYPE) {
      console.error(
        "The specified channel is not a forum channel or cannot be accessed"
      );
      return { activePosts: [], pastPosts: [] };
    }

    const forumChannel = channel as ForumChannel;

    const activeThreads = await forumChannel.threads.fetchActive();
    const pastThreads = await forumChannel.threads.fetchArchived();

    const activePosts = await processThreads(activeThreads.threads);
    const pastPosts = await processThreads(pastThreads.threads);

    return {
      activePosts,
      pastPosts,
    };
  } catch (error) {
    console.error("Error fetching Discord posts:", error);
    return { activePosts: [], pastPosts: [] };
  } finally {
    // await client.destroy();
  }
};
