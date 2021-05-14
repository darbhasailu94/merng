const { gql } = require('apollo-server');

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Book {
        id: ID!
        title: String
        publisher: String
        publishedDate: String
        printType: String
        language: String
        description: String
        bookimg: String
        postId: String
        createdAt: String
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
        getBooks:[Book]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createBook(
            title: String
            publisher: String
            publishedDate: String
            printType: String
            language: String
            description: String
            bookimg: String
            postId: String
            createdAt: String
        ): Book
    }
`;