// grabs the div from the DOM
let movieListDiv = document.getElementById("movieListDiv")
// APIKEY
let apiKey = "c8b2e508"
// DETAILED imbdID
let imdbID = "tt4853102"

// url with api key to get all batman movies
let batmanURL = `http://www.omdbapi.com/?s=batman&apikey=${apiKey}`

// url with api key to get detailed batman movies
let detailedBatmanURL = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`

// Reuqest New GET POST
let reqBatman = new XMLHttpRequest()
reqBatman.open("GET", batmanURL)
// Listener Event To Get All BatMan Movies
reqBatman.addEventListener("load", () => {

    let movies = JSON.parse(event.currentTarget.responseText)


    let movieItems = movies.Search.map(movie => {
        return `<div>                                      
                    <h2><a class="detailedLink" href= "${detailedBatmanURL}" >${movie.Title}</a></h2>
                    <img src='${movie.Poster}' />
                </div>`

    })
    movieListDiv.innerHTML = movieItems.join('')
})

// make the actual request...
reqBatman.send()



