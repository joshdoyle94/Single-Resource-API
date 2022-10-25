///////////////////////////////////////////////////////////
// Import Dependencies
///////////////////////////////////////////////////////////
const { SchemaType } = require('mongoose')
const mongoose = require('./connection')

// we're going to pull the Schema and model from mongoose
// we'll use a syntax called "destructuring"
const { Schema } = mongoose

const commentSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})


//////////////////////////////////////////////////
// Export our scheme
//////////////////////////////////////////////////
module.exports = commentSchema