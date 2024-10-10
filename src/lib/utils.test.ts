import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility function", () => {
  it("should combine multiple class names into a single string", () => {
    const result = cn("class1", "class2", "class3");
    expect(result).toBe("class1 class2 class3");
  });

  it("should merge Tailwind CSS classes intelligently", () => {
    const result = cn("bg-red-500", "bg-blue-500");
    expect(result).toBe("bg-blue-500");
  });

  it("should handle conditional class names", () => {
    const result = cn("class1", false && "class2", "class3");
    expect(result).toBe("class1 class3");
  });

  it("should handle arrays of class names", () => {
    const result = cn(["class1", "class2"], "class3");
    expect(result).toBe("class1 class2 class3");
  });

  it("should handle undefined and null values gracefully", () => {
    const result = cn("class1", undefined, null, "class2");
    expect(result).toBe("class1 class2");
  });

  it("should handle empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });
});
