import gql from 'graphql-tag';
import React, { useContext } from 'react';
import { useQuery} from '@apollo/client';
import { Card, CardContent, CardHeader, Grid, Image,Item } from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from '../components/DeleteButton';
import { AuthContext } from '../context/auth.js';
import NewBook from '../components/NewBook.js';
function SinglePost(props){
    let postMarkup;
    const { user } = useContext(AuthContext);

    const postId = props.match.params.postId;
    let id,username, body, createdAt;
    const { loading, data } =  useQuery(FETCH_POSTS_QUERY);
    const {loading : loadingbooks, data: booksdata} = useQuery(FETCH_BOOKS_QUERY);
    if(loading){
        console.log("loading please wait")
    } else {
        
        const alpha =  data.getPosts.find(function(post,index){
            if(post.id === postId.substr(1)){
                id = post.id;
                username = post.username;
                body = post.body;
                createdAt = post.createdAt;
            }
        })
    }
    if(!id){
        postMarkup = <p>Loading Post</p>
    } else {
        postMarkup = (
            <Grid columns={12}>
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
                {user && username && (
                <Grid.Row>
                    <Grid.Column width={10}>
                        <NewBook />
                    </Grid.Column>
                </Grid.Row>
                )}
                {loadingbooks ? (
                    <h2>loading books...</h2>
                ) : (
                    booksdata.getBooks && booksdata.getBooks.map(book => (
                        <Grid.Column key={book.id} style={{ marginBottom: 20 }} width={5}>
                            <Item.Image size='tiny' src={book.bookimg} />
                            <div>
                                <h3>Name: {book.title}</h3>
                                <h5>Publisher : {book.publisher}</h5>
                                <h5>Published : {book.publishedDate}</h5>
                                <h6>Type : {book.printType}</h6><h6>Language : {book.language}</h6>
                                <p>Description : {book.description}</p>
                            </div>
                        </Grid.Column>
                    ))
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
const FETCH_BOOKS_QUERY = gql`
    {
        getBooks{
            id title publisher publishedDate printType language description bookimg
        }
    }
`

export default SinglePost;