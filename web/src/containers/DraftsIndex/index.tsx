import { Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

import { useAllTweetDrafts } from "api/tweetDrafts/useAllTweetDrafts";
import useUpdateTweetDraft from "api/tweetDrafts/useUpdateTweetDraft";

import MainDraftBody from "./MainDraftBody";

export default function DraftsIndex() {
  let params = useParams();

  const id = parseInt(params.id ?? "", 10);

  const { data } = useAllTweetDrafts();
  const { mutate: updateTweet } = useUpdateTweetDraft(id);

  const tweets = data?.find((d) => d.id === id);

  if (!tweets) {
    return <Text>Draft not found</Text>;
  }

  return (
    <MainDraftBody
      key={JSON.stringify(tweets.id)}
      initialTweets={tweets.data}
      onUpdate={(tweets) => {
        updateTweet(tweets);
      }}
    />
  );
}
