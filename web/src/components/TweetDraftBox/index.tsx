import { Box } from "@chakra-ui/react";
import produce from "immer";
import React from "react";
import arrayInsert from "utils/arrayInsert";
import callFunctionOrReturn from "utils/callFunctionOrReturn";

import TweetBox from "components/TweetBox";

import { SingleTweetData, TweetDraftData } from "api/types";

type TweetDraftBoxPropTypes = {
  tweets: TweetDraftData;
  setTweets: React.Dispatch<React.SetStateAction<TweetDraftData>>;
};

export default function TweetDraftBox({
  tweets,
  setTweets,
}: TweetDraftBoxPropTypes) {
  const addTweet = (index: number) => {
    setTweets((oldTweets) => arrayInsert(oldTweets, index, { text: "" }));
  };
  const deleteTweet = (index: number) => {
    setTweets((oldTweets) => oldTweets.filter((t, i) => i !== index));
  };

  return (
    <Box>
      {tweets.map((tweet, i) => {
        const setTweet = (
          newTweet:
            | SingleTweetData
            | ((oldData: SingleTweetData) => SingleTweetData)
        ) => {
          const newTweets = produce(tweets, (draftState) => {
            draftState[i] = callFunctionOrReturn(newTweet, tweet);
          });
          setTweets(newTweets);
        };
        return (
          <TweetBox
            key={i}
            tweet={tweet}
            setTweet={setTweet}
            showLine={i !== tweets.length - 1}
            onAddTweet={() => addTweet(i + 1)}
            onDeleteTweet={() => deleteTweet(i)}
          />
        );
      })}
    </Box>
  );
}
