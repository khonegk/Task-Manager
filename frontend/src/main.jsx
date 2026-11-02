import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render( // подключаем React
  <React.StrictMode>
    {/* ApolloProvider делает GraphQL-клиент доступным дочерним компонентам. */}
    <ApolloProvider client={client}>
      {/* Корневой компонент пользовательского интерфейса. */}
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
