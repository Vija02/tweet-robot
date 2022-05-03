import { Box, Button, chakra, Flex, Image, Text } from "@chakra-ui/react";
import { useUser } from "contexts/User";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import { SingleTweetData } from "api/types";

const Textarea = chakra(TextareaAutosize);

type TweetBoxPropTypes = {
  onSubmit: (singleTweet: SingleTweetData) => void;
  tweetBody: string;
  setTweetBody: React.Dispatch<React.SetStateAction<string>>;
};

export default function TweetBox({
  onSubmit,
  tweetBody,
  setTweetBody,
}: TweetBoxPropTypes) {
  const { user } = useUser();

  return (
    <Box maxW="600px" margin="auto">
      <Flex px="16px">
        <Image
          width="48px"
          height="48px"
          borderRadius="9999px"
          src={user?.profile_image_url_https}
          mr="16px"
        />
        <Box>
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
            minRows={3}
            w="100%"
            value={tweetBody}
            onChange={(e) => setTweetBody(e.target.value)}
          />
        </Box>
      </Flex>
      <Button onClick={() => onSubmit({ text: tweetBody })}>Submit</Button>
    </Box>
  );
}
