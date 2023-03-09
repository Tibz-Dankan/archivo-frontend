import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
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
