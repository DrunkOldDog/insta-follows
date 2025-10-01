"use server";

import { parse } from "node-html-parser";

const parseHtmlToList = async (fileContent: File): Promise<string[]> => {
  const htmlContent = await fileContent.text();
  const root = parse(htmlContent);

  return root
    .getElementsByTagName("a")
    .map((htmlElement) => htmlElement.innerText)
    .sort();
};

const parseJsonToList = async (fileContent: File): Promise<string[]> => {
  const jsonContent = await fileContent.text();
  const data = JSON.parse(jsonContent);

  // Handle different JSON structures
  let items: any[] = [];

  if (Array.isArray(data)) {
    // Structure like followers_1.json
    items = data;
  } else if (data.relationships_following) {
    // Structure like following.json
    items = data.relationships_following;
  }

  return items.map((item) => item.string_list_data[0].value).sort();
};

const parseFileToList = async (fileContent: File): Promise<string[]> => {
  const fileName = fileContent.name.toLowerCase();

  if (fileName.endsWith(".json")) {
    return parseJsonToList(fileContent);
  } else {
    return parseHtmlToList(fileContent);
  }
};

export const getNonFollowers = async (formData: FormData) => {
  const followersData = formData.get("followers") as File;
  const followingData = formData.get("following") as File;

  // Read file contents and parse based on file type
  const followersList = await parseFileToList(followersData);
  const followingList = await parseFileToList(followingData);

  // Find people you follow who don't follow you back
  const nonFollowers = [];
  let i = 0,
    j = 0;

  while (i < followingList.length) {
    if (followingList[i] === followersList[j]) {
      i++;
      j++;
    } else if (followingList[i] > followersList[j]) {
      j++;
    } else {
      nonFollowers.push(followingList[i]);
      i++;
    }
  }

  return nonFollowers;
};
