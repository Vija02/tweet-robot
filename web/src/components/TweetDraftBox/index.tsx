import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { enUS } from "date-fns/locale";
import produce from "immer";
import React, { useState } from "react";
import { DateTimePicker } from "react-next-dates";
import arrayInsert from "utils/arrayInsert";
import callFunctionOrReturn from "utils/callFunctionOrReturn";

import TweetBox from "components/TweetBox";

import { SingleTweetData, TweetDraftData, TweetSchedule } from "api/types";

type TweetDraftBoxPropTypes = {
  schedule?: TweetSchedule;
  tweets: TweetDraftData;
  setTweets: React.Dispatch<React.SetStateAction<TweetDraftData>>;
};

export default function TweetDraftBox({
  schedule,
  tweets,
  setTweets,
}: TweetDraftBoxPropTypes) {
  const addTweet = (index: number) => {
    setTweets((oldTweets) => arrayInsert(oldTweets, index, { text: "" }));
  };
  const deleteTweet = (index: number) => {
    setTweets((oldTweets) => oldTweets.filter((t, i) => i !== index));
  };

  const [date, setDate] = useState<Date | null>(new Date());

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

      <Box maxW="600px" margin="auto">
        <Divider my={5} color="white" />

        <Flex gap={2} alignItems="center">
          <Text fontWeight="bold" fontSize="xl">
            Schedule
          </Text>
          <Box>
            {!!schedule && (
              <Badge size="sm" variant="solid" colorScheme="green">
                Tweet Scheduled
              </Badge>
            )}
          </Box>
        </Flex>

        <Box mb={4} />

        <DateTimePicker locale={enUS} date={date} onChange={setDate}>
          {({ dateInputProps, timeInputProps }) => (
            <Flex>
              <Box>
                <Text fontSize="sm" fontWeight="bold">
                  DATE
                </Text>
                <Input px={0} border={0} color="primary" {...dateInputProps} />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="bold">
                  TIME
                </Text>
                <Input px={0} border={0} color="primary" {...timeInputProps} />
              </Box>
            </Flex>
          )}
        </DateTimePicker>

        <Box mb={4} />

        <Button>Schedule</Button>
      </Box>
    </Box>
  );
}
