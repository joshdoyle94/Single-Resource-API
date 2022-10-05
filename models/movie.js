/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require('./connection')

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose

// create movies schema
const moviesSchema = new Schema({
  name: String,
  genre: String,
  imdbRating: Number
})

// make movie model
const Movie = model("Movie", moviesSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Movie;