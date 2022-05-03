import React from "react";

import TweetDraftBox from "components/TweetDraftBox";

import useCreateTweetDraft from "api/tweetDrafts/useCreateTweetDraft";

export default function HomeIndex() {
  const { mutate } = useCreateTweetDraft();

  return (
    <TweetDraftBox onSubmit={(tweetDraftData) => mutate(tweetDraftData)} />
  );
}
