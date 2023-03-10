import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { URI } from "../constants/constants";

const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});

interface ProviderProps {
  children: JSX.Element;
}

export const UseApolloProvider: React.FC<ProviderProps> = (
  props
): JSX.Element => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
