import { getNonFollowers } from "./getNonFollowers";
import { readFileSync } from "fs";
import { join } from "path";

describe("getNonFollowers", () => {
  const createMockFile = (content: string, name: string, type: string) => {
    const file = new File([content], name, { type });
    // Add the text() method that the function expects
    file.text = jest.fn().mockResolvedValue(content);
    return file;
  };

  it("should return non-followers with expected length of 58 using HTML files", async () => {
    // Read the HTML mock files
    const followersHtmlPath = join(__dirname, "__testsMocks__", "followers_1.html");
    const followingHtmlPath = join(__dirname, "__testsMocks__", "following.html");
    
    const followersHtmlContent = readFileSync(followersHtmlPath, "utf-8");
    const followingHtmlContent = readFileSync(followingHtmlPath, "utf-8");
    
    const followersFile = createMockFile(followersHtmlContent, "followers.html", "text/html");
    const followingFile = createMockFile(followingHtmlContent, "following.html", "text/html");
    
    // Create FormData with the files
    const formData = new FormData();
    formData.append("followers", followersFile);
    formData.append("following", followingFile);
    
    // Call the function
    const result = await getNonFollowers(formData);
    
    // Assert the result length is 58
    expect(result.nonFollowers).toHaveLength(58);
    
    // Verify it's an array of strings
    expect(Array.isArray(result.nonFollowers)).toBe(true);
    expect(result.nonFollowers.every(item => typeof item === "string")).toBe(true);
  });

  it("should return non-followers with expected length of 58 using JSON files", async () => {
    // Read the JSON mock files
    const followersJsonPath = join(__dirname, "__testsMocks__", "followers_1.json");
    const followingJsonPath = join(__dirname, "__testsMocks__", "following.json");
    
    const followersJsonContent = readFileSync(followersJsonPath, "utf-8");
    const followingJsonContent = readFileSync(followingJsonPath, "utf-8");
    
    const followersFile = createMockFile(followersJsonContent, "followers_1.json", "application/json");
    const followingFile = createMockFile(followingJsonContent, "following.json", "application/json");
    
    // Create FormData with the files
    const formData = new FormData();
    formData.append("followers", followersFile);
    formData.append("following", followingFile);
    
    // Call the function
    const result = await getNonFollowers(formData);
    
    // Assert the result length is 58
    expect(result.nonFollowers).toHaveLength(58);
    
    // Verify it's an array of strings
    expect(Array.isArray(result.nonFollowers)).toBe(true);
    expect(result.nonFollowers.every(item => typeof item === "string")).toBe(true);
  });

  it ("should return the correct followers and following counts", async () => {
    // Read the HTML mock files
    const followersHtmlPath = join(__dirname, "__testsMocks__", "followers_1.html");
    const followingHtmlPath = join(__dirname, "__testsMocks__", "following.html");
    
    const followersHtmlContent = readFileSync(followersHtmlPath, "utf-8");
    const followingHtmlContent = readFileSync(followingHtmlPath, "utf-8");

    const followersFile = createMockFile(followersHtmlContent, "followers.html", "text/html");
    const followingFile = createMockFile(followingHtmlContent, "following.html", "text/html");
    
    // Create FormData with the files
    const formData = new FormData();
    formData.append("followers", followersFile);
    formData.append("following", followingFile);
    
    // Call the function
    const result = await getNonFollowers(formData);
    
    // Assert the result length is 58
    expect(result.followersCount).toBe(1053);
    expect(result.followingCount).toBe(631);
  });
});
