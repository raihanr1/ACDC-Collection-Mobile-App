import React from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httplink = createHttpLink({
  uri: "http://192.168.100.5:4000/graphql",
});

const client = new ApolloClient({
  link: httplink,
  cache: new InMemoryCache(),
});

export default client;
