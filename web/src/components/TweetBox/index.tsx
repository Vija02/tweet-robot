import { Flex, chakra, Image, Box, Text } from "@chakra-ui/react"
import { useUser } from "contexts/User"
import React from "react"
import TextareaAutosize from "react-textarea-autosize"

const Textarea = chakra(TextareaAutosize)

export default function TweetBox() {
	const { user } = useUser()

	return (
		<Flex maxW="600px" px="16px" margin="auto">
			<Image
				width="48px"
				height="48px"
				borderRadius="9999px"
				src={user?.profile_image_url_https}
				mr="16px"
			/>
			<Box>
				<Flex>
					<Text color="primary" fontSize="15px" as="b">{user?.name} </Text>
					<Text color="secondary" fontSize="15px" ml="4px">@{user?.screen_name} </Text>
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
				/>
			</Box>
		</Flex>
	)
}
