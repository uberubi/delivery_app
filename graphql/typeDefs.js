const gql = require("graphql-tag");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    products: [Product]!
  }
  type Product {
    id: ID!
    username: String!
    createdAt: String!
    productName: String!
    description: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createProduct(userId: ID!, productName: String!, description: String!): User!
    deleteProduct(userId: ID!, productId: String!): User!
  }
  type Query {
    getUsers: [User]
  }
`;
