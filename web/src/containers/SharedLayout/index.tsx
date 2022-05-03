import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <Flex minH="100vh" alignItems="stretch">
      <Box w="200px" borderRight="1px solid" borderColor="gray.700">
        <Text>Sidebar</Text>
      </Box>
      <Box flex={1}>
        <Outlet />
      </Box>
    </Flex>
  );
}
