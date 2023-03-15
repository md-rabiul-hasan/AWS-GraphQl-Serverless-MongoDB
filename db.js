const { MongoClient } = require('mongodb');

let client = null;

const connect = async () => {
  if (client && client.serverConfig.isConnected()) {
    return client;
  }

  client = await MongoClient.connect("mongodb+srv://mdrabiulhasan:zWuaHSpsq4MjFHkc@nodejslearning.yr5egud.mongodb.net/aws_graphql", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client;
};

module.exports = { connect };