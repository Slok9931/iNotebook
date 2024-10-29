const mongoose = require('mongoose');
const {Schema} = mongoose;
const TodoSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    work:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        default: "false"
    },
    priority:{
        type: String,
        default: "false"
    }
})
module.exports = mongoose.model('todos', TodoSchema);