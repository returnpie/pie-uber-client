import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ReactDOM from "react-dom";
import client from "./apollo";
import App from "./Components/App";
import GlobalStyles from "./global-styles";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <App />
      </>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
