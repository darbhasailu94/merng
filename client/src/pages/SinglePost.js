import gql from 'graphql-tag';
import React, { useContext } from 'react';
import { useQuery} from '@apollo/client';
import { Card, CardContent, CardHeader, Grid, Image } from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from '../components/DeleteButton';
import { AuthContext } from '../context/auth.js';
import NewBook from '../components/NewBook.js';
import PostBook from '../components/PostBook';
function SinglePost(props){
    let postMarkup;

    const { user } = useContext(AuthContext);

    const postId = props.match.params.postId.substr(1);
    let id,username, body, createdAt, displayname;
    const { loading, data } =  useQuery(FETCH_POSTS_QUERY);
    function capitalize(smallcap) {  
        var words = smallcap.split(' ');  
        var CapitalizedWords = [];  
        words.forEach(element => {  
            CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));  
        });  
        return CapitalizedWords.join(' ');  
    }
    if(loading){
        console.log("loading please wait")
    } else {
        data.getPosts.find(function(post,index){
            if(post.id === postId){
                id = post.id;
                username = post.username;
                body = post.body;
                createdAt = post.createdAt;

                displayname= capitalize(post.username.toString());
            }
        })
    }
    if(!id){
        postMarkup = <p>Loading Post</p>
    } else {
        postMarkup = (
            <Grid columns={16}>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" size="small" float="right" />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Card fluid>
                            <CardContent>
                                <CardHeader>{displayname}</CardHeader>
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
                {user && user.username === username && (
                <>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <NewBook postId={postId}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <PostBook postId={postId}/>
                    </Grid.Column>
                </Grid.Row>
                </>
                )}
            </Grid>
        )
    }
    return postMarkup;
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id body username createdAt
        }
    }
`

export default SinglePost;