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

export const getNonFollowers = async (formData: FormData) => {
  const followersData = formData.get("followers") as File;
  const followingData = formData.get("following") as File;

  // Read file contents and parse HTML
  const followersList = await parseHtmlToList(followersData);
  const followingList = await parseHtmlToList(followingData);

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
