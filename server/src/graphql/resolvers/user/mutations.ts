import { User } from "../../../db/models";
const user = new User();

const userMutations = {
  createUser: async (_: any, args: any) => {
    console.log(args);

    // const newUser = await user.create(args);

    return;
  },
  //   updateUser: async (_, args) => {},
  //   updatePassword: async (_, args) => {},
};

export default userMutations;
