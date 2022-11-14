const fs = require("fs");
const { parse } = require("node-html-parser");

const getFollowsList = async (key) => {
  return new Promise((resolve, reject) =>
    fs.readFile(
      __dirname + `/instagram/${key}.html`,
      "utf8",
      function (err, html) {
        if (err) return reject(err);
        const root = parse(html);
        const followersList = root
          .getElementsByTagName("a")
          .map((htmlElement) => htmlElement.innerText)
          .sort();

        return resolve(followersList);
      }
    )
  );
};

const getInstaFollows = async () => {
  const followingList = await getFollowsList("following");
  const followersList = await getFollowsList("followers");
  const instaFollows = [];

  let i = 0,
    j = 0;
  while (followingList.length > i) {
    if (followingList[i] === followersList[j]) {
      i++;
      j++;
    } else if (followingList[i] > followersList[j]) {
      j++;
    } else {
      instaFollows.push(followingList[i]);
      i++;
    }
  }

  return instaFollows;
};

getInstaFollows().then((data) => {
  console.log("People who doesn't follow you back:", data.length);
  console.log(data);
});
