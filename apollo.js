import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://57cf273caebd.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;
