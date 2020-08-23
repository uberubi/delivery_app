const gql = require('graphql-tag')

module.exports = gql`
    type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
`