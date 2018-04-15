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
        required: true
    }
});

const User = module.exports = mongoose.model('Users', UserSchema);
