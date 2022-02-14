const url = 'http://www.omdbapi.com/'

createAutoComplete({
	root:document.querySelector('.autocomplete')
})

createAutoComplete({
	root: document.querySelector('.autocomplete-two')
})

const onMovieSelect = async movie => {
	const response = await axios.get(url, {
		params: {
			apikey: "b24ef25a", i: movie.imdbID
		}
	})
	console.log(response.data)
	document.querySelector('#summary').innerHTML = movieTemplate(response.data)
}

const movieTemplate = movieDetail => {
	return `
	   <div class="card my-3 border-0">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${movieDetail.Poster}" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${movieDetail.Title}</h5>
                        <h6>${movieDetail.Genre}</h6>
                        <p class="card-text">${movieDetail.Plot}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card text-white bg-primary mb-3">
        	<div class="card-body">
        		<h5 class="card-title">${movieDetail.Awards}</h5>
        		<p class="card-text">Awards</p>
        	</div>
        </div>   
        <div class="card text-white bg-primary mb-3">
        	<div class="card-body">
        		<h5 class="card-title">${movieDetail.imdbRating}</h5>
        		<p class="card-text">IMDB Rating</p>
        	</div>
        </div>
          <div class="card text-white bg-primary mb-3">
        	<div class="card-body">
        		<h5 class="card-title">${movieDetail.BoxOffice}</h5>
        		<p class="card-text">Box Office</p>
        	</div>
        </div>
        <div class="card text-white bg-primary mb-3">
        	<div class="card-body">
        		<h5 class="card-title">${movieDetail.Metascore}</h5>
        		<p class="card-text">Meta Score</p>
        	</div>
        </div>      
        <div class="card text-white bg-primary mb-3">
        	<div class="card-body">
        		<h5 class="card-title">${movieDetail.imdbVotes}</h5>
        		<p class="card-text">IMDB Votes</p>
        	</div>
        </div>    
	`
}

