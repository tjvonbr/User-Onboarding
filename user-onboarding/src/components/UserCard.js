import React from 'react';
import { Card } from 'semantic-ui-react';

function UserCard(props) {
  return (   
    <Card className="user-card">
      <Card.Content>
        <Card.Header className="card-name">{ props.user.name } </Card.Header>
        <Card.Meta className="card-email"> { props.user.email }</Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default UserCard;