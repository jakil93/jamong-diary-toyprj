import Koa from "koa";
import {
  ApolloServer,
  gql,
  UserInputError,
  makeExecutableSchema
} from "apollo-server-koa";
import initDB from "./lib/database";
import dotenv from "dotenv";
import { jwtMiddleware } from "./lib/token";
import bodyParser from "koa-bodyparser";

dotenv.config();

initDB();

const app = new Koa();

app.use(bodyParser());
app.use(jwtMiddleware);

const schema = require("./gq/schema").default;

const server = new ApolloServer({
  schema: schema,
  context: ctx => {
    return ctx;
  }
});

server.applyMiddleware({ app });

const port = 4000;
app.listen(port, () => {
  console.log(`server listening... ${port}`);
  console.log(
    `server listening... http://localhost:${port}${server.graphqlPath}`
  );
});
