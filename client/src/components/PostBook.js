import React, { useState } from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import axios from 'axios';
import gql from 'graphql-tag';
//import { useMutation } from '@apollo/client';

function PostBook(){
    
    const [values, setValues] = useState({
        body: '',
    })
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }
    const [bool, setBool] = useState(false);
    const [views, setViews] = useState(
        {masterdata:{
            title: "",
            publisher: "",
            publishedAt: "",
            pages: "",
            type: "",
            lang:"",
            desc:"",
            rating:""
            }
        }
    )
    let title, publisher, publishedAt, pages, type, lang, desc, rating;
    function getBookDetails(e){
        axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+ e)
        .then(function (response) {
          // handle success
          //const newdata = JSON.parse(response);
    
            const newdata = response.data.items[0].volumeInfo;
            //exp.push(newdata.title,newdata.authors,newdata.publisher,newdata.publishedDate,newdata.description,newdata.pageCount,newdata.printType,newdata.language,newdata.averageRating, newdata.imageLinks,newdata.infoLink);
            title = newdata.title;
            publisher = newdata.publisher;
            publishedAt = newdata.publishedDate;
            pages = newdata.pageCount;
            type = newdata.printType;
            lang = newdata.language;
            desc = newdata.description;
            rating = newdata.averageRating;
            /*console.log("title : ",title, '\n', "publishedAt : ",publishedAt ,'\n' ,
            "publisher : ",publisher ,'\n', "pages: ", pages, '\n', "type: ", type, '\n',"lang : ",lang
            , '\n', "desc : ", desc ,'\n',"rating : ", rating);*/
            setBool(true);
            setViews({...views, masterdata:{
                title:newdata.title,
                publisher:publisher,
                publishedAt:newdata.publishedDate,
                pages:newdata.pageCount,
                type:newdata.printType,
                lang:newdata.language,
                desc:newdata.description,
                rating:newdata.averageRating
                }
            });
            console.log(views);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
          console.log('at least axios working')
        });
    }
    const items = Object.keys(views.masterdata);
    const listitems = items.map((item) =>    <li>{item}</li>  );
    const itemvalues = Object.values(views.masterdata);
    const listitemvalues = itemvalues.map((listitemvalue) =>    <li>{listitemvalue}</li>  );


    const onSubmit = () => {
        var isbn = parseInt(values.body);
        if(isbn){
            console.log(isbn);
        }
        getBookDetails(isbn);
    }

    return (
        <>
        <Grid>
            <Grid.Row>
                <Grid.Column width={4}>
                    <Form onSubmit={onSubmit}>
                        <h2>Enter your Book isbn:</h2>
                    <Form.Field>
                        <Form.Input placeholder="War and Peace" name="body" onChange={onChange} value={values.body} /* error={error ? true : false} */ />
                        <Button type="submit" color="teal">
                            <h3>Submit</h3>
                        </Button>
                    </Form.Field>
                    </Form>
                </Grid.Column>
                {views.masterdata.title &&
                <Grid.Column width={8}>
                    <div style={{margintop : 20}}><span>Name :<h3>{views.masterdata.title}</h3></span><hr /></div>
                    <div style={{margintop : 20}}><span>Publisher :<h3>{views.masterdata.publisher}</h3></span><hr /></div>
                    <div style={{margintop : 20}}><span>Release Date :<h3>{views.masterdata.publishedAt}</h3></span><hr /></div>
                    <div style={{margintop : 20}}><span>No. of Pages :<h3>{views.masterdata.pages}</h3></span><hr /></div>
                    <div style={{margintop : 20}}><span>Type :<h3>{views.masterdata.type}</h3></span><hr /></div>
                    <div style={{margintop : 20}}><span>Description :<h3>{views.masterdata.desc}</h3></span><hr /></div>
                    <div style={{margintop : 20}}><span>Language :<h3>{views.masterdata.lang}</h3></span><hr /></div>
                    <div style={{margintop : 20}}><span>Rating :<h3>{views.masterdata.rating}</h3></span><hr /></div>
                </Grid.Column>
                }
            </Grid.Row>
        </Grid>
        </>
    );

/*
const CREATE_BOOK_MUTATION = gql`
mutation createBook(
    $title: title
    $publisher: publisher
){
    createBook(
        title: $title
        publisher: $publisher
    ){}
}
`
*/
}
export default PostBook;