/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // Load ENV Variables
const express = require('express') // import express


const path = require('path') // import path module
const MovieRouter = require('./controllers/movieControllers')
const UserRouter = require('./controllers/userController')
const CommentRouter = require('./controllers/commentController')
const middleware = require('./utils/middleware')

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require('liquid-express-views')(express())

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
middleware(app)

/////////////////////////////////////////////////////
// Home Route
/////////////////////////////////////////////////////
app.get("/", (req, res) => {
    // res.send("Your server is running, better go out and catch it")
    // you can also send html as a string from res.send
    // res.send("<small style='color: red'>Your server is running, better go out and catch it</small>")
    if (req.session.loggedIn) {
        res.redirect('/movies')
    } else {
        res.render('index.liquid')
    }
})

/////////////////////////////////////////////
// Register our Routes
/////////////////////////////////////////////
// here is where we register our routes, this is how server.js knows to send the appropriate request to the appropriate route and send the correct response
// app.use, when we register a route, needs two arguments
// the first, is the base url endpoint, the second is the file to use
app.use('/movies', MovieRouter)
app.use('/users', UserRouter)
app.use('/comments', CommentRouter)


app.get('/error', (req, res) => {
    // get session variables
    const { username, loggedIn, userId } = req.session
    const error = req.query.error || 'This page does not exist'

    res.render('error.liquid', { error, username, loggedIn, userId })
})

app.all('*', (req, res) => {
    res.redirect('/error')
})

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to port: ${PORT}`))

// END