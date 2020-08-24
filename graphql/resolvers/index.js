const usersResolvers = require("./users");
const productsResolvers = require("./products")

module.exports = {
  Query: {
    ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...productsResolvers.Mutation
  }
}