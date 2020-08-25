import React from "react";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, Icon, Label, Image } from "semantic-ui-react";

dayjs.extend(relativeTime); // extend dayjs with relativeTime plugin for using .fromNow() method

const ProductCard = ({product: {  productName, description, approved, createdAt }}) => {
  return (
    <>
      <Card fluent="true">
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{productName}</Card.Header>
        <Card.Meta >
          {dayjs(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      {/* <Card.Content extra>

            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content> */}
    </Card>
    </>
  );
};

export default ProductCard;
