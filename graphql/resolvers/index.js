const postResolvers = require('./posts');
const userResolvers = require('./users');
const bookResolvers = require('./books');

module.exports = {
    Query: {
        ...postResolvers.Query,
        ...bookResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...bookResolvers.Mutation
    }
};