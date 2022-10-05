/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // Load ENV Variables
const express = require('express') // import express
const morgan = require('morgan') // import morgan
const mongoose = require('mongoose') // import mongoose
const path = require('path') // import path module
const Movie = require('./models/movie')

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = express()

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(express.urlencoded({ extended: true })) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically
app.use(express.json()) // parses incoming requests with JSON payloads

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("Your server is now running! Woo hoo")
})

// Seed route
app.get("/movies/seed", (req, res) => {
    // array of starter fruits
    const startMovies = [
      { name: "Terrifier", genre: "Horror", imdbRating: 5.6 },
      { name: "Finding Nemo", genre: "Adventure", imdbRating: 8.1 },
      { name: "Ghostbusters", genre: "Comedy", imdbRating: 7.8 },
      { name: "Wanted", genre: "Action", imdbRating: 6.7 },
      { name: "The Nightmare Before Christmas", genre: "Musical", imdbRating: 7.9 },
    ]
  
    // Delete all movies
    Movie.deleteMany({}).then((data) => {
      // Seed Starter Movies
      Movie.create(startMovies)
        .then((data) => {
        // send created movies as response to confirm creation
          res.json(data)
        })
    })
})
  
// Index route
app.get("/movies", (req, res) => {
    // find all the movies
    Movie.find({})
      // render a template after they are found
      .then((movies) => {
        // send any movies found in the db as json
        res.json({ movies: movies })
        // You can also use res.status and chain on the json method, like this:
        // res.status(200).json({ fruits: fruits })
      })
      // send error as json if they aren't
      .catch((error) => {
        res.json({ error })
    })
})

// Show route
app.get("/movies/:id", (req, res) => {
    // find one single movie
    const id = req.params.id
    Movie.findById(id)
      // render a template after they are found
      .then((movies) => {
        // send any movies found in the db as json
        res.json({ movies: movies })
        // You can also use res.status and chain on the json method, like this:
        // res.status(200).json({ fruits: fruits })
      })
      // send error as json if they aren't
      .catch((error) => {
        res.json({ error })
    })
})
  
// create route
app.post("/movies", (req, res) => {
    // create the new fruit
    Movie.create(req.body)
      .then((movie) => {
        // send user 201 Created message and the newly created fruit.
        res.status(201).json({ movie: movie.toObject() })
      })
      // send error as json
      .catch((error) => {
        console.log(error)
        res.json({ error })
      })
})

// update entire object route
app.put("/movies/:id", (req, res) => {
        // get the id from params
        const id = req.params.id
        Movie.findByIdAndUpdate(id, req.body, { new: true })
          .then((movie) => {
            // send status of 204 no content
            res.sendStatus(204)
          })
          // send error as json
          .catch((error) => {
            console.log(error)
            res.json({ error })
        })
})

// update partial object data route
app.patch("/movies/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    Movie.findByIdAndUpdate(id, req.body, { new: true })
      .then((movie) => {
        // send status of 204 no content
        res.sendStatus(204)
      })
      // send error as json
      .catch((error) => {
        console.log(error)
        res.json({ error })
    })
})

// Destroy route
app.delete("/movies/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // find and delete the fruit
    Movie.findByIdAndRemove(id)
      .then((movie) => {
        // 204 - No Content
        res.sendStatus(204)
      })
      // send error as json
      .catch((error) => {
        // console.log(error)
        res.json({ error })
      })
})
  
      
  

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))

