import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import { getToken } from "./util";

const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();

  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const httpLink = new HttpLink({
  uri: "https://moufi.fr/graphql"
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;
