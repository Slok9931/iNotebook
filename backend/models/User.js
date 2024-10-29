const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    bio:{
        type: String
    },
    photo:{
        type: String
    }
})
const User = mongoose.model('user', UserSchema); 
module.exports = User;