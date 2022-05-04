import { Box, chakra, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import { useUser } from "contexts/User";
import React from "react";
import {
  BiAddToQueue as BiAddToQueueRaw,
  BiTrashAlt as BiTrashAltRaw,
} from "react-icons/bi";
import TextareaAutosize from "react-textarea-autosize";
import twitterText from "twitter-text";

import { SingleTweetData } from "api/types";

import CircleIndicator from "./CircleIndicator";

const BiAddToQueue = chakra(BiAddToQueueRaw);
const BiTrashAlt = chakra(BiTrashAltRaw);
const Textarea = chakra(TextareaAutosize);

type TweetBoxPropTypes = {
  tweet: SingleTweetData;
  setTweet: React.Dispatch<React.SetStateAction<SingleTweetData>>;
  showLine?: boolean;
  onAddTweet: () => void;
  onDeleteTweet: () => void;
};

export default function TweetBox({
  tweet,
  setTweet,
  showLine,
  onAddTweet,
  onDeleteTweet,
}: TweetBoxPropTypes) {
  const { user } = useUser();

  const parseResult = twitterText.parseTweet(tweet.text);

  return (
    <Box maxW="600px" margin="auto">
      <Flex px="16px">
        <Flex flexDir="column" mr="16px">
          <Image
            width="48px"
            height="48px"
            borderRadius="9999px"
            src={user?.profile_image_url_https}
          />
          {showLine && (
            <Box
              height="100%"
              width="2px"
              margin="auto"
              bgColor="rgb(51, 54, 57)"
            />
          )}
        </Flex>
        <Box flex={1}>
          <Flex>
            <Text color="primary" fontSize="15px" as="b">
              {user?.name}{" "}
            </Text>
            <Text color="secondary" fontSize="15px" ml="4px">
              @{user?.screen_name}{" "}
            </Text>
          </Flex>
          <Textarea
            placeholder="What's happening?"
            border={0}
            color="primary"
            fontSize="20px"
            _focusVisible={{ outline: "none" }}
            background="transparent"
            resize="none"
            minRows={2}
            w="100%"
            value={tweet.text}
            onChange={(e) =>
              setTweet((val) => ({ ...val, text: e.target.value }))
            }
          />
          <Flex gap={4} justifyContent="flex-end">
            <CircleIndicator letterCount={parseResult.weightedLength} />
            <Tooltip label="Add tweet to thread">
              <Box cursor="pointer" onClick={onAddTweet}>
                <BiAddToQueue width="20px" height="20px" color="blue" />
              </Box>
            </Tooltip>
            <Tooltip label="Delete tweet from thread">
              <Box cursor="pointer" onClick={onDeleteTweet}>
                <BiTrashAlt width="20px" height="20px" color="red.400" />
              </Box>
            </Tooltip>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
