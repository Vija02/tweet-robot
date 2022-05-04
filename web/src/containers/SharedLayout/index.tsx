import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAllTweetDrafts } from "api/tweetDrafts/useAllTweetDrafts";
import useCreateTweetDraft from "api/tweetDrafts/useCreateTweetDraft";

import { CustomLink } from "./CustomLink";

export default function SharedLayout() {
  const { data } = useAllTweetDrafts();
  const navigate = useNavigate();

  const { mutate: createTweetDraft } = useCreateTweetDraft();
  const addDraft = () => {
    createTweetDraft([{ text: "" }], {
      onSuccess: (res) => {
        navigate(`/drafts/${res.data.id}`);
      },
    });
  };

  return (
    <Flex minH="100vh" alignItems="stretch">
      <Box w="300px" borderRight="1px solid" borderColor="gray.700">
        <Text fontWeight="bold" py={4} px={4} borderBottom="1px solid" borderColor="gray.800" textAlign="center" fontSize="xl">
          Drafts
        </Text>
        {data?.map((d, i) => {
          const isEmptyText = d.data[0].text === ""

          const id = d.id;
          const bodyText = !isEmptyText ? d.data[0].text : "<Empty>";

          return (
            <CustomLink to={`/drafts/${id}`} key={i}>
              {({ match }) => (
                <Box
                  py={2}
                  px={4}
                  bgColor={match ? "gray.800" : "initial"}
                  _hover={{ bgColor: "gray.800" }}
                  borderBottom="1px solid"
                  borderColor="gray.800"
                >
                  <Text
                  color={!isEmptyText ? "primary": "secondary"}>{bodyText}</Text>
                </Box>
              )}
            </CustomLink>
          );
        })}

        <Flex>
          <Button m={2} flex={1} onClick={addDraft}>
            Add Draft
          </Button>
        </Flex>
      </Box>
      <Box flex={1}>
        <Outlet />
      </Box>
    </Flex>
  );
}
