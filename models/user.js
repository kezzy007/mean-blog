const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    'name': {
        type: String,
        required: false
    },
    'email':  {
        type: String,
        required: true
    },
    'password':  {
        type: String,
        required: false
    },
    'remember_token':  {
        type: String,
        required: false
    },
    'activated':  {
        type: Boolean,
        required: false
    },
    'role':  {
        type: String,
        required: true,
        default: 'user'
    },
    'googleId':{
        type: String,
        required: false
    },
    'thumbnail':{
        type: String,
        required: false
    },
    'username':{
        type: String,
        required: false
    }
    
});

const User = module.exports = mongoose.model('Users', UserSchema);

module.exports.getUserById = async _id => {

    return await User.findById({ _id })

}