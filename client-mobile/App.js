import * as React from "react";
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import client from "./config/graphql.js";
import NavbarCategoires from "./components/NavbarCategories.js";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { Text } from "react-native";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <NativeBaseProvider>
          <NavbarCategoires />
        </NativeBaseProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}
