import { AuthenticationError } from "apollo-server-koa";
import DiaryModel from "../../models/diary";
import AccountModel from "../../models/account";

export const typeDef = `
type Diary {
    id: String
    title: String
    content: String
    createdAt: String
    author: Account
}
extend type Query{
    diary(id: String!): Diary
    queryAllDiaries: [Diary]
}
extend type Mutation{
    writeDiary(title: String!, content: String!): Diary
}
`;
export const resolvers = {
  Diary: {
    author: async ({ author }) => {
      return await AccountModel.findById(author);
    }
  },
  Query: {
    diary: {
      author: ({ id }) => {
        console.log(`diary author : ${id}`);
        return AccountModel.findById(id);
      }
    },
    queryAllDiaries: () => {
      return DiaryModel.find();
    }
  },
  Mutation: {
    writeDiary: async (root, { title, content }, { ctx }) => {
      const { user } = ctx.request;
      if (!user) {
        throw new AuthenticationError("권한이 없습니다.");
      }

      const diary = await DiaryModel({
        title,
        content,
        author: user._id
      }).save();

      console.log(diary);
      return diary;
    }
  }
};
