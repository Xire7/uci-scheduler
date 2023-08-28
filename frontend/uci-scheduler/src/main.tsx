import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  components: {
    Drawer: {
      sizes: {
        heavy: {
          dialog: { maxWidth: "1075px" },
        },
        general : {
          dialog: {maxWidth: "850px"}
        }
      },
    },
  },
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found")
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
