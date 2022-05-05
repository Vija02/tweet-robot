import { Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAllTweetDrafts } from "api/tweetDrafts/useAllTweetDrafts";
import useDeleteTweetDraft from "api/tweetDrafts/useDeleteTweetDraft";
import useUpdateTweetDraft from "api/tweetDrafts/useUpdateTweetDraft";

import MainDraftBody from "./MainDraftBody";

export default function DraftsIndex() {
  const params = useParams();
  const navigate = useNavigate();

  const id = parseInt(params.id ?? "", 10);

  const { data } = useAllTweetDrafts();
  const { mutate: updateTweet } = useUpdateTweetDraft(id);
  const { mutate: deleteTweet } = useDeleteTweetDraft(id);

  const tweets = data?.find((d) => d.id === id);

  if (!tweets) {
    return <Text>Draft not found</Text>;
  }

  return (
    <MainDraftBody
      key={JSON.stringify(tweets.id)}
      draftId={tweets.id}
      initialTweets={tweets.data}
      onUpdate={(tweets) => {
        if (tweets.length === 0) {
          deleteTweet(undefined, {
            onSuccess: () => {
              navigate("/");
            },
          });
          return;
        }
        updateTweet(tweets);
      }}
    />
  );
}
