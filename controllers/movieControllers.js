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
    // console.log("this is the request", req)
    // in our index route, we want to use mongoose model methods to get our data
    Movie.find({})
        .populate("comments.author", "username")
        .then(movies => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // console.log(fruits)
            // this is fine for initial testing
            // res.send(fruits)
            // this the preferred method for APIs
            // res.json({ fruits: fruits })
            // here, we're going to render a page, but we can also send data that we got from the database to that liquid page for rendering
            res.render('movies/index', { movies, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})



// Show route
router.get("/:id", (req, res) => {
    const id = req.params.id

    Movie.findById(id)
        // populate will provide more data about the document that is in the specified collection
        // the first arg is the field to populate
        // the second can specify which parts to keep or which to remove
        // .populate("owner", "username")
        // we can also populate fields of our subdocuments
        .populate("comments.author", "username")
        .then(movie => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render('movies/show', { movie, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})
 
// create route
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    res.render('movies/new', { username, loggedIn, userId })
})

// POST request
// create route -> gives the ability to create new fruits
router.post("/", (req, res) => {

    // here, we'll get something called a request body
    // inside this function, that will be referred to as req.body
    // this is going to add ownership, via a foreign key reference, to our fruits
    // basically, all we have to do, is append our request body, with the `owner` field, and set the value to the logged in user's id
    req.body.owner = req.session.userId
    console.log('the movie from the form', req.body)
    // we'll use the mongoose model method `create` to make a new fruit
    Movie.create(req.body)
        .then(movie => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // send the user a '201 created' response, along with the new fruit
            // res.status(201).json({ fruit: fruit.toObject() })
            res.redirect('/movies')
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET request
// only movies owned by logged in user
// we're going to build another route, that is owner specific, to list all the fruits owned by a certain(logged in) user
router.get('/mine', (req, res) => {
    // find the fruits, by ownership
    Movie.find({ owner: req.session.userId })
    // then display the fruits
        .then(movies => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId

            // res.status(200).json({ fruits: fruits })
            res.render('movies/index', { movies, username, loggedIn, userId })
        })
    // or throw an error if there is one
        .catch(err => res.redirect(`/error?error=${err}`))
})

// edit page
router.get("/edit/:id", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    const movieId = req.params.id

    Movie.findById(movieId)
        // render the edit form if there is a fruit
        .then(movie => {
            res.render('movies/edit', { movie, username, loggedIn, userId })
        })
        // redirect if there isn't
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
    // res.send('edit page')
})

// update entire object route
router.put("/:id", (req, res) => {
    console.log("req.body initially", req.body)
    const id = req.params.id

    console.log('req.body after changing checkbox value', req.body)
    Movie.findById(id)
        .then(movie => {
            if (movie.owner == req.session.userId) {
                // must return the results of this query
                return movie.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => {
            // console.log('returned from update promise', data)
            res.redirect(`/movies/${id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// Destroy route
router.delete('/:id', (req, res) => {
    // get the fruit id
    const movieId = req.params.id

    // delete and REDIRECT
    Movie.findByIdAndRemove(movieId)
        .then(movie => {
            // if the delete is successful, send the user back to the index page
            res.redirect('/movies')
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router