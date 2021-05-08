import gql from 'graphql-tag';
import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth.js';

function Register(props){
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, {data:{register: userData}}){
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
        addUser();
    }

    return(
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h2>Register Yourself</h2>
                <Form.Input label="Username" placeholder="Username.." name="username" type="text" error={errors.username ? true : false} value={values.username} onChange={onChange} /> 
                <Form.Input label="Email" placeholder="Email.." name="email" type="email" error={errors.email ? true : false} value={values.email} onChange={onChange} />
                <Form.Input label="Password" placeholder="Password.." name="password" error={errors.password ? true : false} type="password" value={values.password} onChange={onChange} />
                <Form.Input label="confirm Password" placeholder="confirm Password.." name="confirmPassword" type="password" error={errors.confirmPassword ? true : false} value={values.confirmPassword} onChange={onChange} />

                <div>
                    <Button type="submit" primary className="register-button" fluid>
                        <h3>Register</h3>
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

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
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

export default Register;