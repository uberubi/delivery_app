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
  type Moder {
    id: ID!
    modername: String!
    createdAt: String!
    token: String!
  }
  type Product {
    id: ID
    username: String!
    userId: ID 
    createdAt: String!
    productName: String!
    description: String!
    approved: Boolean!
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
    approveProduct(userId: ID!, productId: ID!): User!
    moderLogin(modername: String!, password: String!): Moder!
  }
  type Query {
    getUsers: [User]
    getProductsForApprove: [Product]
  }
`;
