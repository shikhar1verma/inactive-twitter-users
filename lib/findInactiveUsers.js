"strict mode";
const fs = require("fs");
const { fetchTwitterHeader } = require("../utils/helpers/fetchTwitterHeaders");
const {
  fetchLastReplyData,
  fetchLastTweetData,
} = require("./fetchUserActivity");
const { createInactiveUserExcel } = require("./createInactiveUserExcel");


const fetchInactiveUsers = async (inactiveDays) => {
  const headers = await fetchTwitterHeader();
  // console.log(headers);
  const followingList = JSON.parse(
    fs.readFileSync(__dirname + "/../metadata/static/manual_following_list.json", "utf8")
  );

  const inactiveUsers = [];
  for (let i = 0; i < followingList.length; i++) {
    const userId = followingList[i];
    let lastTweetData = await fetchLastTweetData(userId, headers);
    let lastReplyData = await fetchLastReplyData(userId, headers);
    inactiveUsers.push({
      userId: userId,
      userName: lastTweetData ? lastTweetData.userName : null,
      handleName: lastTweetData ? lastTweetData.handleName : null,
      lastTweetDate: lastTweetData
        ? lastTweetData.tweetCreated.toString()
        : null,
      lastTweetDateTimestamp: lastTweetData
        ? lastTweetData.tweetCreated.getTime()
        : null,
      lastReplyData: lastReplyData
        ? lastReplyData.tweetCreated.toString()
        : null,
      lastReplyDataTimestamp: lastReplyData
        ? lastReplyData.tweetCreated.getTime()
        : null,
    });
    console.log(userId, lastTweetData ? lastTweetData.userName : null);
    fs.writeFileSync( __dirname + 
      "/../metadata/dynamic/inactive_following_users_tweet_data.json",
      JSON.stringify(inactiveUsers)
    );
  }

  await createInactiveUserExcel(inactiveUsers, inactiveDays) // 10 is the number of days to consider inactive
};

module.exports = {
  fetchInactiveUsers
}
