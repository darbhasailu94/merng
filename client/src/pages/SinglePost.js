import gql from 'graphql-tag';
import React, { useContext } from 'react';
import { useQuery} from '@apollo/client';
import { Card, CardContent, CardHeader, Grid, Image } from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from '../components/DeleteButton';
import { AuthContext } from '../context/auth.js';
import PostBook from '../components/PostBook.js';
function SinglePost(props){
    let postMarkup;
    const { user } = useContext(AuthContext);

    const postId = props.match.params.postId;

    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    let id,username, body, createdAt;
    const alpha = data.getPosts.find(function(post,index){
        if(post.id === postId.substr(1)){
            id = post.id;
            username = post.username;
            body = post.body;
            createdAt = post.createdAt;
        }
    })
    console.log(id, username, body, createdAt);
    /*
    const { data: {getPost} }  = useQuery(FETCH_POST_QUERY, {
        variables: {postId}
    });
    console.log(getPost);
    console.log("hello");
    */
    if(!id){
        postMarkup = <p>Loading Post</p>
    } else {
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" size="small" float="right" />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Card fluid>
                            <CardContent>
                                <CardHeader>{username}</CardHeader>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </CardContent>
                            <hr />
                            {user && user.username === username && (
                                <DeleteButton postId={id} />
                            )}
                        </Card>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <PostBook />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;
}
/*
const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: posterId){
            id
            body
            username
            createdAt
        }
    }
`
*/
const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id body username createdAt
        }
    }
`

export default SinglePost;