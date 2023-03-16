import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { URI } from "../constants/constants";

const httpLink = createHttpLink({
  uri: URI,
});

const authLink = setContext((_, { headers }) => {
  const data: any = localStorage.getItem("auth");
  const parsedDate = JSON.parse(data);
  const token = parsedDate?.token;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
