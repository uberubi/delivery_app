import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Form, Button } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { FETCH_PRODUCTS_QUERY } from "../utils/graphql";


// TODO: made query fixes
const ProductAddForm = ({ userId }) => {
  const [errors, setErrors] = useState({});
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    productName: "",
    description: "",
  });

  const [createProduct, { error }] = useMutation(CREATE_PRODUCT_MUTATION, {
    userId,
    productName: values.productName,
    description: values.description,
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_PRODUCTS_QUERY });
      proxy.writeQuery({
        query: FETCH_PRODUCTS_QUERY,
        data: {
          getUserProducts: [result.data.createProduct, ...data.getUserProducts],
        },
      });
      values.productName = "";
      values.description = "";
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function createPostCallback() {
    createProduct();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a product:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Product Name..."
            name="productName"
            onChange={onChange}
            value={values.productName}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="Description..."
            name="description"
            onChange={onChange}
            value={values.description}
            error={error ? true : false}
          />
          <Button type="submit" color="red">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct(
    $userId: ID!
    $productName: String!
    $description: String!
  ) {
    createProduct(
      userId: $userId
      productName: $productName
      description: $description
    ) {
      id
      username
      createdAt
      products {
        productName
        description
      }
    }
  }
`;

export default ProductAddForm;
