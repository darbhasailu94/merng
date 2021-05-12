import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
function NewBook({postId}){
    const [values, setValues] = useState({
        isbn: ''
    })
    const [books, setBooks] = useState({
        title: '',
        publisher: '',
        publishedDate: '',
        printType: '',
        language: '',
        description: '',
        bookimg:'',
        postId:''
    })
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }
    const getUsers = async() => {
        const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + values.isbn);
        const newbook = await response.json();
        setBooks({...books, 
            title: newbook.items[0].volumeInfo.title ? newbook.items[0].volumeInfo.title : "Name not found",
            publisher: newbook.items[0].volumeInfo.publisher ? newbook.items[0].volumeInfo.publisher : "Publisher not found",
            publishedDate: newbook.items[0].volumeInfo.publishedDate ? newbook.items[0].volumeInfo.publishedDate : " Date not found",
            printType: newbook.items[0].volumeInfo.printType ? newbook.items[0].volumeInfo.printType : " Print Type not found",
            language: newbook.items[0].volumeInfo.language ? newbook.items[0].volumeInfo.language : "Language not found",
            description: newbook.items[0].volumeInfo.description ? newbook.items[0].volumeInfo.description : 'Description not found',
            bookimg: newbook.items[0].volumeInfo.imageLinks.smallThumbnail ? newbook.items[0].volumeInfo.imageLinks.smallThumbnail : "https://react.semantic-ui.com/images/avatar/large/molly.png",
            postId: postId
        });
        console.log(newbook.items[0].volumeInfo);
        //console.log(books.title,books.publisher,books.publishedDate,books.printType,books.description);

    }
    function handleClick(){
        createBook();
    }
    const [createBook, {error}] = useMutation(CREATE_BOOK_MUTATION, {
        update(_, result){
            console.log(result)
            books.title = ''
            books.publisher = ''
            books.publishedDate = ''
            books.printType = ''
            books.description = ''
            books.description = ''
            books.language = ''
            books.bookimg = ''
            books.postId = ''
        },
        onError(err){
            console.log(err);
            console.log(error);
        },
        variables: books
    })
    const onSubmit = (event) => {
        event.preventDefault();
        getUsers();
    }
    return (
            <Form onSubmit={onSubmit}>
                <h2>Enter ISBN of Book to add: </h2>
                <Form.Field>
                    <Form.Input placeholder="Leo Tolstoy" name="isbn" onChange={onChange} value={values.isbn} />
                    <Button type="submit" color="teal">
                        <h3>Submit</h3>
                    </Button>
                    <Button onClick={handleClick}>
                        press after fetch
                    </Button>
                </Form.Field>
            </Form>
    );
}

const CREATE_BOOK_MUTATION = gql`
mutation createBook(
    $title: String
    $publisher: String
    $publishedDate: String
    $printType: String
    $language: String
    $description: String
    $bookimg: String
    $postId: String)
    {
    createBook(
    title : $title
    publisher: $publisher
    publishedDate: $publishedDate
    printType: $printType
    language: $language
    description: $description
    bookimg: $bookimg
    postId: $postId)
    {   
        id
        title
        publisher
        publishedDate
        printType
        language
        description
        bookimg
        postId
    }
}
`

export default NewBook








/*
    {error && 
            <div className="ui error message" style={{ marginBottom: 20 }}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        }
*/