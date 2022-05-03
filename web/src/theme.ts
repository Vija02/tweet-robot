import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading:
      '"TwitterChirp", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    body: '"TwitterChirp", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  colors: {
    primary: "rgb(231, 233, 234)",
    secondary: "rgb(113, 118, 123)",
    blue: "rgb(29, 155, 240)",
    blueSecondary: "rgb(26, 140, 216)",
  },
  components: {
    Text: {
      baseStyle: {
        color: "primary",
      },
    },
    Button: {
      variants: {
        solid: {
          bg: "blue",
          color: "primary",
          _hover: { bg: "blueSecondary", color: "primary" },
        },
      },
    },
  },
});

export default theme;
