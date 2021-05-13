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
        //alert("Author Created");
        createPost();
        setTimeout(() => {window.location.reload()}, 1200);
    }
    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>Enter your Author:</h2>
            <Form.Field>
                <Form.Input placeholder="Leo Tolstoy" name="body" onChange={onChange} value={values.body} error={error ? true : false} />
                <Button type="submit" color="teal">
                    <h3>Submit</h3>
                </Button>
            </Form.Field>
        </Form>
        {error && 
            <div className="ui error message" style={{ marginBottom: 20 }}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        }
    
        </>
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








/*
    {error && 
            <div className="ui error message" style={{ marginBottom: 20 }}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        }
*/