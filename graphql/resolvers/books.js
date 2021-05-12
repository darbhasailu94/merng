const { AuthenticationError } = require('apollo-server');

const Book = require('../../models/Book');

module.exports = {
Query: {
    async getBooks(){
        try {
            const books = await Book.find().sort({createdAt: -1});
            return books;
        } catch(err) {
            throw new Error(err);
        }
    }
},

Mutation: {
    async createBook(_,{
        title,
        publisher,
        publishedDate,
        printType,
        language,
        description,
        bookimg,
        postId
    }){
        //const user = checkAuth(context);

        const newBook = new Book({
            title : title,
            publisher : publisher,
            publishedDate : publishedDate,
            printType : printType,
            language : language,
            description : description,
            bookimg : bookimg,
            postId: postId
        });

        const book = await newBook.save();

        return book;
    }

}

}