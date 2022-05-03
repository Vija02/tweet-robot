import { Box, Button } from "@chakra-ui/react";
import produce from "immer";
import React from "react";
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
  const addTweet = () => {
    setTweets((oldTweets) => oldTweets.concat({ text: "" }));
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
          />
        );
      })}
      <Button onClick={addTweet}>Add tweet</Button>
    </Box>
  );
}
