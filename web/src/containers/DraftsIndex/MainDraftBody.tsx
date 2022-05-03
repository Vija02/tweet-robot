import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import TweetDraftBox from "components/TweetDraftBox";

import { TweetDraftData } from "api/types";

type MainDraftBodyPropTypes = {
  initialTweets: TweetDraftData;
  onUpdate: (tweets: TweetDraftData) => void;
};

export default function MainDraftBody({
  initialTweets,
  onUpdate,
}: MainDraftBodyPropTypes) {
  const [tweets, setTweets] = useState(initialTweets);

  const [debouncedTweets] = useDebounce(tweets, 1000);

  useEffect(() => {
    onUpdate(debouncedTweets);
  }, [debouncedTweets]);

  return (
    <Box my={8}>
      <TweetDraftBox tweets={tweets} setTweets={setTweets} />
    </Box>
  );
}
