import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "contexts/User";
import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import "react-next-dates/dist/style.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

import Root from "./Root";
import "./index.css";
import theme from "./theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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
  </React.StrictMode>
);
