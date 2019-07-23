// grabs the div from the DOM
let movieListDiv = document.getElementById("movieListDiv")
// grabs the a link form the DOM
let detailedLink = document.getElementById("detailedLink")
// grabs the detailed div 
let detailedMovieDiv = document.getElementById("detailedMovieDiv")

// APIKEY
let apiKey = "c8b2e508"


// url with api key to get all batman movies
let batmanURL = `http://www.omdbapi.com/?s=batman&apikey=${apiKey}`


// Reuqest New GET POST
let reqBatman = new XMLHttpRequest()
reqBatman.open("GET", batmanURL)
// Listener Event To Get All BatMan Movies
reqBatman.addEventListener("load", () => {

    let movies = JSON.parse(event.currentTarget.responseText)


    let movieItems = movies.Search.map(movie => {
        return `<div>   
                    <img onclick="detailedFeature('${movie.imdbID}')" src='${movie.Poster}'/> 
                    <h2>${movie.Title}</h2>
                </div>`
    })
    movieListDiv.innerHTML = movieItems.join("")
})

// make the actual request...
reqBatman.send()


// Function that shows more details on the movie clicked
function detailedFeature(imdbID) {

    // url with api key to get detailed batman movies
    let detailedBatmanURL = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`

    // call a new GET request
    let reqDetailedBatman = new XMLHttpRequest()
    reqDetailedBatman.open("GET", detailedBatmanURL)

    reqDetailedBatman.addEventListener("load", function () {
        let moviesFeature = JSON.parse(event.currentTarget.responseText)

        let moviesFeatureTemplate =
            `<div>  
                 <h2>${ moviesFeature.Title}</h2> 
                 <img src='${ moviesFeature.Poster}'/> 
                 <p>${ moviesFeature.Year}</p>
                 <p>${ moviesFeature.Rated}</p> 
                 <p>${ moviesFeature.Released}</p> 
                 <p>${ moviesFeature.Director}</p>  
    </div>`

        detailedMovieDiv.innerHTML = moviesFeatureTemplate
    })
    reqDetailedBatman.send()
}
