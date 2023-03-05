import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import graphqlServer from "./graphql";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

const startGraphqlServer = async () => {
  try {
    await graphqlServer.start();

    graphqlServer.applyMiddleware({
      app,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

startGraphqlServer();

const startApp = async () => {
  try {
    await app.listen(PORT);
    console.log(`🚀  GraphQL server running at port: ${PORT}`);
  } catch (err: any) {
    console.log("Not able to run GraphQL server");
    console.log(err.message);
  }
};

startApp();
