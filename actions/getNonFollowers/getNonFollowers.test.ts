import { getNonFollowers } from "./getNonFollowers";
import { readFileSync } from "fs";
import { join } from "path";

describe("getNonFollowers", () => {
  it("should return non-followers with expected length of 58", async () => {
    // Read the HTML mock files
    const followersHtmlPath = join(__dirname, "__testsMocks__", "followers_1.html");
    const followingHtmlPath = join(__dirname, "__testsMocks__", "following.html");
    
    const followersHtmlContent = readFileSync(followersHtmlPath, "utf-8");
    const followingHtmlContent = readFileSync(followingHtmlPath, "utf-8");
    
    // Create mock File objects with text() method
    const createMockFile = (content: string, name: string, type: string) => {
      const file = new File([content], name, { type });
      // Add the text() method that the function expects
      file.text = jest.fn().mockResolvedValue(content);
      return file;
    };
    
    const followersFile = createMockFile(followersHtmlContent, "followers.html", "text/html");
    const followingFile = createMockFile(followingHtmlContent, "following.html", "text/html");
    
    // Create FormData with the files
    const formData = new FormData();
    formData.append("followers", followersFile);
    formData.append("following", followingFile);
    
    // Call the function
    const result = await getNonFollowers(formData);
    
    // Assert the result length is 58
    expect(result).toHaveLength(58);
    
    // Verify it's an array of strings
    expect(Array.isArray(result)).toBe(true);
    expect(result.every(item => typeof item === "string")).toBe(true);
  });
});
