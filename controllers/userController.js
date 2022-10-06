// ////////////////////////////////////////
// // Import Dependencies
// ////////////////////////////////////////
// const express = require("express")
// const User = require("../models/user")
// const bcrypt = require("bcryptjs")

// /////////////////////////////////////////
// // Create Route
// /////////////////////////////////////////
// const router = express.Router()

// /////////////////////////////////////////
// // Routes
// /////////////////////////////////////////

// // The Signup Routes (Get => form, post => submit form)
// // post to send the signup info
// router.post('/signup', async (req, res) => {
//     console.log('this is initial req.body in signup', req.body)
//     // first encrypt our password
//     req.body.password = await bcrypt.hash(
//         req.body.password, 
//         await bcrypt.genSalt(10)
//     )
//     // console.log('req.body after hash', req.body)

//     // create a new user
//     User.create(req.body)
//         // if created successfully redirect to login
//         .then(user => {
//             console.log(user)
//             res.status(201).json({ username: user.username })
//         })
//         // if an error occurs, send err
//         .catch(error => {
//             console.log(error)
//             res.json(error)
//         })
// })

// // The login Routes (Get => form, post => submit form)
// router.post('/login', async (req, res) => {
//     // console.log('request object', req)
//     // get the data from the request body
//     const { username, password } = req.body
//     // then we search for the user
//     User.findOne({ username })
//         .then(async (user) => {
//             // check if the user exists
//             if (user) {
//                 // compare the password
//                 // bcrypt.compare evaluates to a truthy or a falsy value
//                 const result = await bcrypt.compare(password, user.password)
//                 // If our bcrypt is successful, it'll turn result into a truthy value, in which case we can proceed by creating the session.
//                 if (result) {
//                     // then we'll need to use the session object
//                     // store some properties in the session
//                     req.session.username = username
//                     req.session.loggedIn = true
//                     req.session.userId = user.id

//                     console.log('session user id', req.session)

//                     // We can send a 201 status and the user as json
//                     // we'll change this later for security purposes, but for now, we can just look at the whole user.
//                     res.status(201).json({ user: user.toObject() })
//                 } else {
//                     // send an error if the password doesnt match
//                     res.json({ error: 'username or password incorrect'})

//                 }
//             } else {
//                 // send an error if the user doesnt exist
//                 res.json({ error: 'user does not exist' })
//             }
//         })
//         // catch any other errors that occur
//         .catch(err => {
//             console.log(err)
//             res.json(err)
//         })
// })

// // logout route -> destroy the session
// router.delete('/logout', (req, res) => {
//     // destroy the session
//     req.session.destroy(err => {
//         console.log('this is err in logout', err)
//         // res.redirect('/')
//         // if we want, we can send a message and a status of 200
//         // upon successful logout, we can send the status and a message
//         // res.status(200).json({ message: 'You are now logged out'})
//         // OR, what's more common, is to use a 204 status with no content
//         res.sendStatus(204)
//     })
// })

// /////////////////////////////////////////
// // Export Router
// /////////////////////////////////////////
// module.exports = router


////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
// route for sign up
router.post('/signup', async (req, res) => {
    // this route will receive a req.body
    console.log('this is our initial req.body', req.body)
    // first step, is to encrypt our password
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    console.log('req.body after hash', req.body)

    // create a new user
    User.create(req.body)
        // if successful, console log the user(for now)
        .then(user => {
            console.log(user)
            res.status(201).json({ username: user.username})
        })
        // if an error occurs, log the error
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// a route for log in
router.post('/login', async (req, res) => {
    // get our data from the req body, saved as separate variables
    const { username, password } = req.body

    // search the db for a user with that username
    User.findOne({ username })
        .then(async (user) => {
            // check if they exist
            if (user) {
                // compare the password
                // bcrypt.compare -> evals to a truthy or a falsy
                const result = await bcrypt.compare(password, user.password)

                if (result) {
                    // this is where we use the session object
                    // session object lives in our request
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id 

                    console.log('this is req.session', req.session) 

                    // we'll send a 201 status and the user as json for now
                    // we'll change this later for security purposes
                    res.status(201).json({ user: user.toObject() })
                } else {
                    res.json({ error: 'username or password incorrect' })
                }
            } else {
                // send an error message
                res.json({ error: 'user does not exist' })
            }
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// a route for log out 
router.delete('/logout', (req, res) => {
    // destroy the session(eventually we'll redirect)
    req.session.destroy(err => {
        console.log('req.session after logout', req.session)
        console.log('err on logout?', err)

        res.sendStatus(204)
    })
})

/////////////////////////////////////////
// Export Router
/////////////////////////////////////////
module.exports = router