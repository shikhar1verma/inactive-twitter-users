"strict mode";
const fs = require("fs");
const axios = require("axios");

const fetchLastTweetData = async (userId, headers) => {
  const tweetCount = 2;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      "https://twitter.com/i/api/graphql/PoZUz38XdT-pXNk0FRfKSw/UserTweets?variables=%7B%22userId%22%3A%22" +
      userId +
      "%22%2C%22count%22%3A" +
      tweetCount +
      "%2C%22includePromotedContent%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Afalse%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22longform_notetweets_richtext_consumption_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D",
    headers: headers,
  };
  try {
    const response = await axios.request(config);
    const responseData = JSON.parse(JSON.stringify(response.data));
    const instructions =
      responseData.data.user.result.timeline_v2.timeline.instructions;
    const entries = instructions.filter(
      (e) => e.type === "TimelineAddEntries"
    )[0].entries;
    const tweetEntries = entries.filter((e) => e.entryId.includes("tweet-"));
    const tweetDataList = tweetEntries.map((e) => {
      const userName =
        e.content.itemContent.tweet_results.result.core.user_results.result
          .legacy.name;
      const handleName = 
        e.content.itemContent.tweet_results.result.core.user_results.result.legacy.screen_name
      const tweetCreated = new Date(
        e.content.itemContent.tweet_results.result.legacy.created_at
      );
      const tweetData = {
        userName,
        handleName,
        tweetCreated,
      };
      return tweetData;
    });
    // Sort the array in descending order by date
    tweetDataList.sort((a, b) => b.tweetCreated - a.tweetCreated);
    return tweetDataList.length > 0 ? tweetDataList[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchLastReplyData = async (userId, headers) => {
  const tweetCount = 2;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      "https://twitter.com/i/api/graphql/0ocNJLLmYdXyHl-WbLMmmw/UserTweetsAndReplies?variables=%7B%22userId%22%3A%22" +
      userId +
      "%22%2C%22count%22%3A" +
      tweetCount +
      "%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Afalse%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22longform_notetweets_richtext_consumption_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D",
    headers: headers,
  };

  try {
    const response = await axios.request(config);
    const responseData = JSON.parse(JSON.stringify(response.data));
    const instructions =
      responseData.data.user.result.timeline_v2.timeline.instructions;
    const entries = instructions.filter(
      (e) => e.type === "TimelineAddEntries"
    )[0].entries;
    const tweetEntries = entries.filter((e) => e.entryId.includes("tweet-"));
    const tweetDataList = tweetEntries.map((e) => {
      const userName =
        e.content.itemContent.tweet_results.result.core.user_results.result
          .legacy.name;
      const tweetCreated = new Date(
        e.content.itemContent.tweet_results.result.legacy.created_at
      );
      const tweetData = {
        userName,
        tweetCreated,
      };
      return tweetData;
    });
    // Sort the array in descending order by date
    tweetDataList.sort((a, b) => b.tweetCreated - a.tweetCreated);
    return tweetDataList.length > 0 ? tweetDataList[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  fetchLastTweetData,
  fetchLastReplyData,
}