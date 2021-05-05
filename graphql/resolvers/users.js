const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');

module.exports = {
    Mutation: {
        async register(_, 
        {
            registerInput:{username, email, password, confirmPassword }
        },
            context, info )
        {
            const user = await User.findOne({username});

            if(user){
                throw new UserInputError('username exists',{errors: {username:'someone beat you to this username'}});
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            },SECRET_KEY,{ expiresIn: '1h' });
            return {
                ...res._doc,
                id: res.id,
                token
            };
        }
    }
}