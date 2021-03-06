import gql from 'graphql-tag';
import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth.js';

function Login(props){
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        password: '',
    })

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    } 

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data:{login: userData}}){
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors); 
        },
        variables: values
    })

    const onSubmit = (event) => {
        event.preventDefault();
        loginUser();
    }

    return(
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h2>Login</h2>
                <Form.Input label="Username" placeholder="Username.." name="username" type="text" error={errors.username ? true : false} value={values.username}  onChange={onChange} /> 
                <Form.Input label="Password" placeholder="Password.." name="password" error={errors.password ? true : false} type="password" value={values.password} onChange={onChange} />

                <div>
                    <Button type="submit" primary className="register-button" fluid>
                        <h3>Login</h3>
                    </Button>
                </div>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
                username: $username
                password: $password
        )
        {
            id 
            email 
            username 
            createdAt 
            token
        }
    }
`

export default Login;