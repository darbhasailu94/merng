import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth.js';
import Postcard from '../components/Postcard';
import PostForm from '../components/PostForm';
//import axios from 'axios';

function Home(){
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    return(
        <Grid columns={3} /*divided*/>
            <Grid.Row className="page-title">
                <h1>Recent Authors</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? (
                    <h2>loading authors...</h2>
                ) : (
                    data.getPosts && data.getPosts.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }} >
                            <Postcard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id body username createdAt
        }
    }
`
export default Home;