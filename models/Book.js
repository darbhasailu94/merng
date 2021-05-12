const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
    title: String,
    publisher: String,
    publishedDate: String,
    printType: String,
    language: String,
    description: String,
    bookimg: String 
});

module.exports = model('Book', bookSchema);