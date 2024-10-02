import { Client, GatewayIntentBits } from "discord.js";
import { Question } from "@/types";

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

    const channel = await client.channels.fetch(process.env.FORUM_CHANNEL_ID);

    if (channel?.type !== 15) {
      throw new Error("The specified channel is not a forum channel");
    }

    const threads = await channel.threads.fetchActive();

    const posts = await Promise.all(
      threads?.threads?.map(async (thread) => {
        const messages = await thread.messages.fetch({ limit: 1 });
        const firstMessage = messages.first();

        return {
          id: thread.id,
          title: thread.name,
          tags: thread.appliedTags,
          votes: thread.messageCount,
          views: thread.viewCount || 0,
          answers: thread.messageCount - 1,
          author: firstMessage?.author.username || "Unknown",
          timeAgo: new Date(thread?.createdAt).toLocaleString(), // Simplified for server-side rendering
          content: firstMessage?.content || "",
        };
      })
    );

    return posts;
  } catch (error) {
    console.error("Error fetching Discord posts:", error);
    throw error;
  } finally {
    await client.destroy();
  }
}
