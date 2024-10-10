import { describe, it, expect } from "vitest";
import { fetchDiscordPosts, fetchDiscordThread } from "./mock";
import { Question } from "@/types";
import mockData from "../../mocks/discordData.json";

describe("Discord Mock API", () => {
  describe("fetchDiscordPosts", () => {
    it("should return an object with activePosts and pastPosts", async () => {
      const result = await fetchDiscordPosts();
      expect(result).toHaveProperty("activePosts");
      expect(result).toHaveProperty("pastPosts");
    });

    it("should return arrays for activePosts and pastPosts", async () => {
      const { activePosts, pastPosts } = await fetchDiscordPosts();
      expect(Array.isArray(activePosts)).toBe(true);
      expect(Array.isArray(pastPosts)).toBe(true);
    });

    it("should return the correct number of posts", async () => {
      const { activePosts, pastPosts } = await fetchDiscordPosts();
      expect(activePosts.length + pastPosts.length).toBeGreaterThan(0);
    });

    it("should return posts with all required properties", async () => {
      const { activePosts, pastPosts } = await fetchDiscordPosts();
      const allPosts = [...activePosts, ...pastPosts];

      allPosts.forEach((post: Question) => {
        expect(post).toHaveProperty("id");
        expect(post).toHaveProperty("title");
        expect(post).toHaveProperty("content");
        expect(post).toHaveProperty("author");
        expect(post).toHaveProperty("timeAgo");
        expect(post).toHaveProperty("tags");
        expect(post).toHaveProperty("votes");
        expect(post).toHaveProperty("views");
        expect(post).toHaveProperty("answers");
        expect(post).toHaveProperty("replies");
      });
    });
  });

  describe("fetchDiscordThread", () => {
    it("should return a thread when given a valid ID", async () => {
      const thread = await fetchDiscordThread("1");
      expect(thread).not.toBeNull();
      expect(thread?.id).toBe("1");
    });

    it("should return null for an invalid thread ID", async () => {
      const thread = await fetchDiscordThread("invalid_id");
      expect(thread).toBeNull();
    });

    it("should return a thread with all required properties", async () => {
      const thread = await fetchDiscordThread("1");
      expect(thread).toHaveProperty("id");
      expect(thread).toHaveProperty("title");
      expect(thread).toHaveProperty("content");
      expect(thread).toHaveProperty("author");
      expect(thread).toHaveProperty("timeAgo");
      expect(thread).toHaveProperty("tags");
      expect(thread).toHaveProperty("votes");
      expect(thread).toHaveProperty("views");
      expect(thread).toHaveProperty("answers");
      expect(thread).toHaveProperty("replies");
    });

    it("should return a thread with the correct number of replies", async () => {
      const thread = await fetchDiscordThread("1");
      expect(thread?.replies?.length).toBeGreaterThan(0);
      expect(thread?.replies?.length).toBe(thread?.answers);
    });

    it("should return threads with code snippets intact", async () => {
      const thread = await fetchDiscordThread("2"); // Assuming this is the thread with JS code
      const codeReply = thread?.replies?.find((reply) =>
        reply.content.includes("```javascript")
      );
      expect(codeReply).toBeDefined();
      expect(codeReply?.content).toContain("const fetchData = () => {");
    });
  });

  describe("Mock Data Integrity", () => {
    it("should have consistent data between mock file and fetchDiscordPosts", async () => {
      const { activePosts, pastPosts } = await fetchDiscordPosts();
      const allPosts = [...activePosts, ...pastPosts];

      console.log(
        "Original mock data:",
        JSON.stringify(mockData.posts, null, 2)
      );
      console.log("Fetched posts:", JSON.stringify(allPosts, null, 2));

      expect(allPosts.length).toBe(mockData.posts.length);

      allPosts.forEach((post, index) => {
        console.log(`Comparing post ${index}:`);
        console.log("Fetched post:", JSON.stringify(post, null, 2));
        console.log(
          "Mock data post:",
          JSON.stringify(mockData.posts[index], null, 2)
        );
        expect(post.id).toBe(mockData.posts[index].id);
        expect(post.title).toBe(mockData.posts[index].title);
      });
    });

    it("should maintain code snippets in replies", () => {
      const postWithCode = mockData.posts.find((post) =>
        post.replies.some((reply) => reply.content.includes("```javascript"))
      );
      expect(postWithCode).toBeDefined();

      const replyWithCode = postWithCode?.replies?.find((reply) =>
        reply.content.includes("```javascript")
      );
      expect(replyWithCode).toBeDefined();
      expect(replyWithCode?.content).toContain("const fetchData = () => {");
    });
  });
});
