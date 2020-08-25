import gql from "graphql-tag";

export const FETCH_PRODUCTS_QUERY = gql`
  query($userId: ID!) {
    getUserProducts(userId: $userId) {
      id
      username
      productName
      description
      approved
      createdAt
    }
  }
`;
