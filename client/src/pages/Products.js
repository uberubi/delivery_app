import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import ProductCard from "../components/ProductCard";
import ProductAddForm from "../components/ProductAddForm";
const Products = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { loading, data } = useQuery(FETCH_PRODUCTS_QUERY, {
    variables: {
      userId: user.id,
    },
  });
  console.log(
    useQuery(FETCH_PRODUCTS_QUERY, {
      variables: {
        userId: user.id,
      },
    })
  );

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Shop's products</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <ProductAddForm  userId={user.id} />
          </Grid.Column>
        )}

        {loading ? (
          <h1>loading products...</h1>
        ) : (
          <Transition.Group>
            {data.getUserProducts &&
              data.getUserProducts.map((product) => (
                <Grid.Column key={product.id} style={{ marginBottom: 20 }}>
                  <ProductCard product={product} />

                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_PRODUCTS_QUERY = gql`
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
export default Products;
