import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import TweetDraftBox from "components/TweetDraftBox";

import { useAllTweetSchedules } from "api/tweetSchedules/useAllTweetSchedules";
import { TweetDraftData } from "api/types";

type MainDraftBodyPropTypes = {
  draftId: number;
  initialTweets: TweetDraftData;
  onUpdate: (tweets: TweetDraftData) => void;
};

export default function MainDraftBody({
  draftId,
  initialTweets,
  onUpdate,
}: MainDraftBodyPropTypes) {
  const { data: tweetSchedules } = useAllTweetSchedules();

  const schedule = tweetSchedules?.find(
    (schedule) => schedule.tweet_draft_id === draftId
  );

  const [tweets, setTweets] = useState(initialTweets);

  const [debouncedTweets, controls] = useDebounce(tweets, 1000);

  useEffect(() => {
    if (tweets.length === 0) {
      controls.flush();
    }
  }, [tweets]);

  useEffect(() => {
    onUpdate(debouncedTweets);
  }, [debouncedTweets]);

  return (
    <Box my={8}>
      <TweetDraftBox
        schedule={schedule}
        tweets={tweets}
        setTweets={setTweets}
      />
    </Box>
  );
}
