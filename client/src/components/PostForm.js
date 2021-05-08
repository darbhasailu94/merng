import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

function PostForm(){
    const [values, setValues] = useState({
        body: '',
    })
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }
    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        update(_, result){
            console.log(result)
            values.body = ''
        },
        onError(err){
            console.log(err);
        },
        variables: values
    })
    const onSubmit = (event) => {
        event.preventDefault();
        createPost();
    }
    return (
        <React.Fragment>
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input placeholder="Hi World" name="body" onChange={onChange} value={values.body} />
                <Button type="submit" color="teal">
                    <h3>Submit</h3>
                </Button>
            </Form.Field>
        </Form>
        {error && (
            <div className="ui error message" style={{ marginBottom: 20 }}>
                <h3>{error.graphQLErrors[0].message}</h3>
            </div>
        )}
        </React.Fragment>
    );
}

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
    createPost(body : $body){
        id body createdAt username
    }
}
`

export default PostForm