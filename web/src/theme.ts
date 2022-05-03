import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
	fonts: {
		heading:
			'"TwitterChirp", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
		body: '"TwitterChirp", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
	},
	colors: {
    primary: "rgb(231, 233, 234)",
    secondary: "rgb(113, 118, 123)",
  },
	components: {
		Text: {
			baseStyle: {
				color: "primary"
			}
		}
	}
})

export default theme
