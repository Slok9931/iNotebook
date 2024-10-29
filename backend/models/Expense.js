const mongoose = require('mongoose');
const {Schema} = mongoose;
const ExpenseSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    transaction:{
        type: String
    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    amount:{
        type: Number,
        required: true
    },
    note:{
        type: String,
    }
})
module.exports = mongoose.model('expenses', ExpenseSchema);