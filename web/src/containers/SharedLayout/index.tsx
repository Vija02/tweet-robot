import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

import { useAllTweetDrafts } from "api/tweetDrafts/useAllTweetDrafts";

export default function SharedLayout() {
  const { data } = useAllTweetDrafts();

  return (
    <Flex minH="100vh" alignItems="stretch">
      <Box w="300px" borderRight="1px solid" borderColor="gray.700">
        {data?.map((d) => (
          <Text>{d.data[0].text}</Text>
        ))}
      </Box>
      <Box flex={1}>
        <Outlet />
      </Box>
    </Flex>
  );
}
