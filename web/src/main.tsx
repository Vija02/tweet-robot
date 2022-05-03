import React from "react"
import ReactDOM from "react-dom/client"
import Root from "./Root"
import { ChakraProvider } from "@chakra-ui/react"
import { useState } from "react"

import { BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import theme from "./theme"
import { QueryClient, QueryClientProvider } from "react-query"
import { UserProvider } from "contexts/User"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider resetCSS theme={theme}>
				<UserProvider>
					<Router>
						<Root />
					</Router>
				</UserProvider>
			</ChakraProvider>
		</QueryClientProvider>
	</React.StrictMode>,
)
