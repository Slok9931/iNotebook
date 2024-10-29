const mongoose = require('mongoose');
const {Schema} = mongoose;
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String
    },
    description:{
        type: String,
        reqired: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    favourite:{
        type: String,
        default: "false"
    }
})
module.exports = mongoose.model('notes', NotesSchema);