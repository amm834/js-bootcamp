const autocompleteConfig = {
	renderOption(movie) {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
		<img src="${imgSrc}"  width="50">
		${movie.Title} (${movie.Year})
		`;
	},
	onOptionSelect(movie) {
		document.getElementById('tutorial').classList.add('d-none')
		onMovieSelect(movie)
	},
	inputValue(movie) {
		return movie.Title;
	},
	async fetchData(searchTerm) {
		const response = await axios.get('http://www.omdbapi.com/', {
			params: {
				apikey: "b24ef25a",
				s: searchTerm
			}
		})

		if (response.data.Error) {
			return [];
		}

		return response.data.Search;
	}
}
createAutoComplete({
	...autocompleteConfig,
	root: document.getElementById('left-autocomplete')
})

createAutoComplete({
	...autocompleteConfig,
	root: document.getElementById('right-autocomplete')
})


const onMovieSelect = async movie => {
	const response = await axios.get('http://www.omdbapi.com/', {
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

