import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({ // клиент для GraphQL-запросов
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(), // кэш данных
});
export default client;
