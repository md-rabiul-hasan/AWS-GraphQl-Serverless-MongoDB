const { ApolloServer } = require('apollo-server-lambda');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { MongoClient } = require('mongodb');

const schema = makeExecutableSchema({ typeDefs, resolvers });

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && cachedDb.serverConfig && cachedDb.serverConfig.isConnected()) {
    console.log('=> Using cached database instance');
    return Promise.resolve(cachedDb);
  }

  console.log('=> Creating new database instance');
  const client = await MongoClient.connect("mongodb+srv://mdrabiulhasan:zWuaHSpsq4MjFHkc@nodejslearning.yr5egud.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
  cachedDb = client.db("aws_graphql");
  return cachedDb;
}



const server = new ApolloServer({
  schema,
  context: async () => {
    const db = await connectToDatabase();
    return { db };
  },
});

exports.graphqlHandler = server.createHandler();