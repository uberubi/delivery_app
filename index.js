const { ApolloServer, PubSub } = require("apollo-server");
const pubsub = new PubSub()

const typeDefs = require("./graphql/typeDefs");

const server = new ApolloServer({typeDefs, resolvers, context: ({ req }) => ({ req, pubsub })})

const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server runnig at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });