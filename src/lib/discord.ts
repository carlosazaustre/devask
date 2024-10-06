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

const FORUM_CHANNEL_TYPE = ChannelType.GuildForum;
const THREAD_CHANNEL_TYPE = ChannelType.PublicThread;

interface DiscordPosts {
  activePosts: Question[];
  pastPosts: Question[];
}

/**
 * Extracts relevant information from a Discord thread to form a Question object.
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
 * Fetches a Discord thread and returns its details as a `Question` object.
 *
 * @param threadId - The ID of the Discord thread to fetch.
 * @returns A promise that resolves to a `Question` object containing the thread
 * details, or `null` if an error occurs.
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
    await client.destroy();
  }
}

/**
 * Fetches posts from a specified Discord forum channel.
 *
 * This function logs into a Discord client using a bot token, fetches the specified forum channel,
 * and retrieves both active and archived threads from the channel. It processes these threads to
 * extract posts and returns them categorized as active and past posts.
 *
 * @returns {Promise<DiscordPosts>} A promise that resolves to an object containing
 * arrays of active and past posts.
 *
 * @throws Will log an error and return empty arrays if there is an issue with fetching
 * the posts or if the specified channel is not a forum channel.
 */
export async function fetchDiscordPosts(): Promise<DiscordPosts> {
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
    await client.destroy();
  }
}
