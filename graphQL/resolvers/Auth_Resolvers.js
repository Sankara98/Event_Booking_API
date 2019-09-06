const bcrypt = require('bcrypt')
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
module.exports = {
    users: async () => {
        try{
            const users =  await User.find().populate('createdEvents')
            return users.map(user => {
                return {...user._doc, _id: user.id}
            });
        }
        catch(err) {
            throw err;
        }
    },

    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email})
            if(existingUser) {
                throw new Error ("User Already Exists")
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
            let user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save()
            return {...result._doc, password: null, _id: result.id}
        }
        catch(err) {
            throw err;
        }
        
    },

    login: async({email, password}) => {
        
        try {
            const user = await User.findOne({email: email});
            if (!user) {
                throw new Error('User does not exist!');
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if(!isEqual) {
                throw new Error('Password is incorrect!');
            }

            const token = jwt.sign({userId: user.id, email: user.email},'somesupersecretkey',{expiresIn: '1h'
            });
            return {userId: user.id, token: token, tokenExpiration: 1};
        }
        catch(err){
            throw err;
        }
    }

};