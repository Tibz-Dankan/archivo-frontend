import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import graphqlServer from "./graphql";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//   console.log("Graphql server started and running on port" + PORT);
// });

const startApp = async () => {
  try {
    await app.listen(PORT);
    console.log(`🚀  GraphQL server running at port: ${PORT}`);
  } catch {
    console.log("Not able to run GraphQL server");
  }
};

startApp();

graphqlServer.applyMiddleware({
  app,
});
