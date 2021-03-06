const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
const { MONGODB } = require('./config.js');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
});


mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
    console.log('mongodb connected');
    return server.listen({ port: 5000 });
}).then(res => {
    console.log(`server running at ${res.url}`);
});