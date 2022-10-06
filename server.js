/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // Load ENV Variables
const express = require('express') // import express


const path = require('path') // import path module
const MovieRouter = require('./controllers/movieControllers')
const UserRouter = require('./controllers/userController')
const middleware = require('./utils/middleware')

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = express()

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
middleware(app)

/////////////////////////////////////////////////////
// Home Route
/////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("Your server is running, better go out and catch it")
})

/////////////////////////////////////////////
// Register our Routes
/////////////////////////////////////////////
// here is where we register our routes, this is how server.js knows to send the appropriate request to the appropriate route and send the correct response
// app.use, when we register a route, needs two arguments
// the first, is the base url endpoint, the second is the file to use
app.use('/movies', MovieRouter)
app.use('/users', UserRouter)


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))

// END