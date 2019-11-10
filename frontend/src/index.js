import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import theme from "./styles/theme";
import { BrowserRouter } from "react-router-dom";
import Client from "./lib/apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "mobx-react";
import RootStore from "./stores/RootStore";

const rootStore = new RootStore();
ReactDOM.render(
  <Provider {...rootStore}>
    <ApolloProvider client={Client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </Provider>,
  document.querySelector("#root")
);
