import { GraphQLServer, PubSub } from "graphql-yoga";
// import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Message from "./resolvers/Message";
import Subscription from "./resolvers/Subscription";
// import User from "./resolvers/User";
// import Post from "./resolvers/Post";
// import Comment from "./resolvers/Comment";
import ChatBox from "./resolvers/ChatBox";

const mongoose = require("mongoose");
const db = mongoose.connection;
function connectMongo() {
  mongoose.connect(
    "mongodb+srv://user-test:WinChiu1206@webprogramingcourse.f8c11.mongodb.net/chatroomPractice?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Mongo database connected!");
  });
}
const mongo = {
  connect: connectMongo,
};
mongo.connect();



const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: { Query, ChatBox, Mutation, Message, Subscription },
  context: { db, pubsub },
});

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
