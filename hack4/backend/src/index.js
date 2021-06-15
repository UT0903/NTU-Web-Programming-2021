import db from './db';  // see the README for how to manipulate this object
import { GraphQLServer, PubSub } from 'graphql-yoga';
//import ChatBox from './resolvers/ChatBox';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
//import mongoose from 'mongoose';
// import http from 'http';
// import WebSocket from 'ws';
// import path from 'path';
//import mongo from './mongo';

const pubsub = new PubSub();
// console.log(Query)
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
  context: {
    db,
    pubsub
  }
});

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
// TODO
// Setup the GraphQL server