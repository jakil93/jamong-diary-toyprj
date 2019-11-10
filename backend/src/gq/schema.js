import {
  typeDef as Account,
  resolvers as accountResolvers
} from "./typedefs/account";
import {
  typeDef as Diary,
  resolvers as diaryResolvers
} from "./typedefs/diary";
import { makeExecutableSchema } from "graphql-tools";
import AccountModel from "../models/account";
import { merge } from "lodash";

const Query = `
type Query {
    _empty : String
}
type Mutation {
    _empty : String
}
`;

const resolvers = {
  Query: {
    // posts: () => Post,
    // post: (root, { id }) => {
    //   console.log(root);
    //   const searchPost = Post.filter(p => p.id === id)[0];
    //   return searchPost;
    // },
    // login: async (root, { username, password }, { ctx }) => {
    //   const result = await AccountModel.localLogin({ username, password });
    //   if (result) {
    //     ctx.cookies.set("access_token", await result.generateToken(), {
    //       httpOnly: true,
    //       maxAge: 1000 * 60 * 60 * 24 * 7
    //     });
    //   }
    //   return result;
    // }
  },
  Mutation: {}
};

export default makeExecutableSchema({
  typeDefs: [Query, Account, Diary],
  resolvers: merge(resolvers, diaryResolvers, accountResolvers)
});
