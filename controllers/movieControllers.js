////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Movie = require("../models/movie")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
  
// Index route
router.get("/", (req, res) => {
    // find all the movies
    Movie.find({})
      // render a template after they are found
      .then(movies => {
        // send any movies found in the db as json
        res.json({ movies: movies })
        // You can also use res.status and chain on the json method, like this:
      })
      // send error as json if they aren't
      .catch(err => console.log(err))
})

// Show route
router.get("/:id", (req, res) => {
    // find one single movie
    const id = req.params.id
    Movie.findById(id)
      // render a template after they are found
      .then(param => {
            res.json(param)
        // You can also use res.status and chain on the json method, like this:
      })
      // send error as json if they aren't
      .catch(err => res.json(err))
})
  
// create route
router.post("/", (req, res) => {
    // create the new movie
    Movie.create(req.body)
      .then(movie => {
        // send user 201 Created message and the newly created movie.
        res.status(201).json({ movie: movie.toObject() })
      })
      // send error as json
      .catch(error => console.log(error)) 
})

// update entire object route
router.put("/:id", (req, res) => {
        // get the id from params
        const id = req.params.id
        Movie.findByIdAndUpdate(id, req.body, { new: true })
          .then(movie => {
            console.log('the movie from update', movie)
            // send status of 204 no content
            res.sendStatus(204)
          })
          // send error as json
          .catch(err => console.log(err))
})

// update partial object data route
router.patch("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    Movie.findByIdAndUpdate(id, req.body, { new: true })
      .then(movie => {
        console.log('the movie from the update', movie)
        // send status of 204 no content
        res.sendStatus(204)
      })
      // send error as json
      .catch(err => console.log(err))
})

// Destroy route
router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // find and delete the movie
    Movie.findByIdAndRemove(id)
      .then(() => {
        // send 204 if successful
        res.sendStatus(204)
      })
      // send error as json
      .catch(err => res.json(err))
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router