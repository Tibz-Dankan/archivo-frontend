import { ApolloServer } from "apollo-server-express";
import schema from "./schema"; // We imported this

const apolloServer = new ApolloServer({
  schema,
  //   playground: env.development,
});

export default apolloServer;
