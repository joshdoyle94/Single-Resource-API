///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Movie = require('./movie')

///////////////////////////////////////////
// Seed Script Code
////////////////////////////////////////////
// save the connection in a variable
const db = mongoose.connection

db.on('open', () => {
	// array of starter movies
	const startMovies = [
		{ name: "Terrifier", genre: "Horror", imdbRating: 5.6 },
        { name: "Finding Nemo", genre: "Adventure", imdbRating: 8.1 },
        { name: "Ghostbusters", genre: "Comedy", imdbRating: 7.8 },
        { name: "Wanted", genre: "Action", imdbRating: 6.7 },
        { name: "The Nightmare Before Christmas", genre: "Musical", imdbRating: 7.9 },
	]

	// when we seed data, there are a few steps involved
	// delete all the data that already exists(will only happen if data exists)
    Movie.deleteMany({})
        .then(deletedMovies => {
            console.log('this is what .remove returns', deletedMovies)

            // create a bunch of new fruits from startFruits
            Movie.create(startMovies)
                .then(data => {
                    console.log('here are the newly created movies', data)
                    // always close connection to the db
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    // always close connection to the db
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
    // replace all of them with the startMovies
})