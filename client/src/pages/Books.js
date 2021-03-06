import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react'
import { Item } from 'semantic-ui-react'

function Books() {
  let newBooks, markUp;
  const {loading,data} = useQuery(FETCH_BOOKS_QUERY);
  if(loading){
    console.log("loading books")
  } else {
    newBooks = data.getBooks;
  }
  if(!newBooks){
    markUp = <h2>Loading Books</h2>
  } else {
    markUp = (data.getBooks && newBooks.map(book => (
      <Item.Group className="card-container" key={book.id}>
      <Item>
        <Item.Image size='small' src={book.bookimg} rounded/>
        <Item.Content>
          <Item.Header>{book.title}</Item.Header>
          <Item.Meta>Publisher: {book.publisher}</Item.Meta>
          <Item.Description>
            <p>{book.description}</p>
          </Item.Description>
          <Item.Extra>Released: {book.publishedDate}</Item.Extra>
          <Item.Extra>Type : {book.printType}</Item.Extra>
          <Item.Extra>Language: {book.language}</Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
    ))
      
    )
  }
return markUp
}

const FETCH_BOOKS_QUERY = gql`
    {
        getBooks{
            id title publisher publishedDate printType language description bookimg postId
        }
    }
`
export default Books;
