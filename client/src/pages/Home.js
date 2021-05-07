import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import Postcard from '../components/Postcard';

function Home(){
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    return(
        <Grid columns={3} /*divided*/>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h2>loading posts...</h2>
                ) : (
                    data.getPosts && data.getPosts.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
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