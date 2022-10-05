///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Movie = require('./movie')

///////////////////////////////////////////
// Seed Code
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
		    console.log('this is what remove returns', deletedMovies)
		    // then we create with our seed data
            Movie.create(startMovies)
                .then(data => {
                    console.log('Here are the new seed movies', data)
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
	    })
        .catch(error => {
            console.log(error)
            db.close()
        })
    
})
