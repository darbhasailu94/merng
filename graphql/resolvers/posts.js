const { AuthenticationError } = require('apollo-server');
const { argsToArgsConfig } = require('graphql/type/definition');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth.js');

module.exports = {
    Query: {
        async getPosts(){
            try {
                const posts = await Post.find().sort({createdAt: -1});
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getPost(_,{postId}){
            try {
                const post = await Post.findById(postId);
                if(post){
                    return post;
                } else {
                    throw new Error('post not found')
                }
            }
            catch(err){
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_,{body},context){
            const user = checkAuth(context);

            if(body.trim() === ""){
                throw new Error('Post cannot be empty');
            }
            const newPost = new Post({
                body,
                user:user.id,
                username:user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            return post;
        },
        async deletePost(_,{postId},context){
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'post deleted';
                } else {
                    throw new AuthenticationError('not your post to delete homie');
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    }
};