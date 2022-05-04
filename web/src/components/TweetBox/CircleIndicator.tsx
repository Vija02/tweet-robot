import { Box, Tooltip } from "@chakra-ui/react";

type PropTypes = { letterCount: number };

export default function CircleIndicator({ letterCount }: PropTypes) {
  const maxLetters = 280;
  // TODO: Other colors
  const fullCount = 56.5487;

  return (
    <Tooltip label={`${letterCount}/${maxLetters}`}>
      <Box width="20px" height="20px" transform="rotate(-90deg)">
        <svg
          height="100%"
          style={{ overflow: "visible" }}
          viewBox="0 0 20 20"
          width="100%"
        >
          <circle
            cx="50%"
            cy="50%"
            fill="none"
            stroke-width="2"
            r="9"
            stroke="#2F3336"
          ></circle>
          <circle
            cx="50%"
            cy="50%"
            fill="none"
            stroke-width="2"
            r="9"
            stroke="#1D9BF0"
            stroke-linecap="round"
            style={{
              strokeDashoffset: `${
                fullCount - (fullCount / maxLetters) * letterCount
              }px`,
              strokeDasharray: `${fullCount}px`,
            }}
          ></circle>
        </svg>
      </Box>
    </Tooltip>
  );
}
