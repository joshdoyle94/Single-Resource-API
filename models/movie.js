/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require('./connection')
const User = require('./user')
const commentSchema = require('./comment')

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose

// create movies schema
const moviesSchema = new Schema({
  name: String,
  genre: String,
  imdbRating: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [commentSchema]
}, {timestamps: true})

// make movie model
const Movie = model("Movie", moviesSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Movie;