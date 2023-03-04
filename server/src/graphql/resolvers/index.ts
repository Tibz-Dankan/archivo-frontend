import { userQueries, userMutations } from "./user";
import { fileQueries, fileMutations } from "./file";

const resolvers = {
  Query: {
    ...userQueries,
    ...fileQueries,
  },
  Mutation: {
    ...userMutations,
    ...fileMutations,
  },
};

export default resolvers;
