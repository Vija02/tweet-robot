import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

import TweetBox from "components/TweetBox";

import { TweetDraftData } from "api/types";

type TweetDraftBoxPropTypes = {
  onSubmit: (tweetDraftData: TweetDraftData) => void;
};

export default function TweetDraftBox({ onSubmit }: TweetDraftBoxPropTypes) {
  const [tweetBody, setTweetBody] = useState("");

  return (
    <Box>
      <TweetBox
        onSubmit={(tweet) => {
          onSubmit([tweet]);
        }}
        tweetBody={tweetBody}
        setTweetBody={setTweetBody}
      />
    </Box>
  );
}
