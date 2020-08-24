const usersResolvers = require("./users");
const productsResolvers = require("./products")
const modersResolvers = require('./moders')

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...productsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...productsResolvers.Mutation,
    ...modersResolvers.Mutation
  }
}