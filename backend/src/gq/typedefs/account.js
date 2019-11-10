import AccountModel from "../../models/account";
import { UserInputError, AuthenticationError } from "apollo-server-koa";

export const typeDef = `
type Account {
    id: String
    username: String
}
extend type Query{
    account(id: String!): Account
    login(username: String!, password: String!): Account
    profile: Account
    logout: Account
}
extend type Mutation{
    addAccount(username: String, password: String): Account
}
`;

export const resolvers = {
  Query: {
    login: async (root, { username, password }, { ctx }) => {
      const result = await AccountModel.localLogin({ username, password });
      if (result) {
        ctx.cookies.set("access_token", await result.generateToken(), {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7
        });
      }

      return result;
    },
    logout: async (root, args, { ctx }) => {
      const { user } = ctx.request;
      if (!user) {
        throw new AuthenticationError("권한이 없습니다.");
      }
      ctx.cookies.set("access_token", null, {
        maxAge: 0,
        httpOnly: true
      });
      return await AccountModel.findById(user._id);
    },
    profile: async (root, _, { ctx }) => {
      const { user } = ctx.request;
      console.log(user);
      if (!user) {
        throw new AuthenticationError("권한이 없습니다.");
      }
      return await AccountModel.findById(user._id);
    }
  },
  Mutation: {
    addAccount: async (root, { username, password }, ctx) => {
      console.log(`username : ${username}`);
      console.log(`password : ${password}`);

      if (await AccountModel.exists({ username })) {
        throw new UserInputError("이미 존재하는 username입니다.", {
          invalidArgs: ["username"]
        });
      }

      return AccountModel.localRegister({ username, password });
    }
  }
};
