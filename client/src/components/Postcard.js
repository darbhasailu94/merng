import React, {useContext} from 'react';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth.js';
import DeleteButton from './DeleteButton.js';

function Postcard({post: {body, createdAt, id, username}}){
    const { user } = useContext(AuthContext);
    return (
        <Card fluid>
            <Card.Content>
                <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                <Card.Header>Author : {body}</Card.Header>
                <Card.Meta>added : {moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>Librarian : {username}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button labelPosition="right" as={Link} to={`posts/:${id}`}>
                    <Button color="blue" basic>
                        <Icon name="book" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                        <span>Books</span>
                    </Label>
                </Button>
                {user && user.username === username && <DeleteButton postId={id} />}
            </Card.Content>
        </Card>
    )
}
export default Postcard