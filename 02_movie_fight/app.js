const url = 'http://www.omdbapi.com/'

const root = document.querySelector('.autocomplete')
root.innerHTML = `
        <input type="search " class="dropdown-toggle form-control" data-bs-toggle="dropdown"  data-bs-auto-close="outside"/>
        <ul class="dropdown-menu results mt-2 invisible"></ul>
`
const results = document.querySelector('.results')

const fetchData = async (searchTerm) => {
	const response = await axios.get(url, {
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


const onInput = async (event) => {
	const movies = await fetchData(event.target.value)
	if (!movies.length) {
		results.classList.add('invisible')
		return;
	}

	results.innerHTML = ''
	results.classList.remove('invisible')

	for (const movie of movies) {
		const list = document.createElement('li')
		const option = document.createElement('a')
		option.classList.add('dropdown-item')

		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		option.innerHTML = `
		<img src="${imgSrc}"  width="50">
		${movie.Title}
		`;

		option.addEventListener('click', () => {
			results.classList.add('invisible');
			input.value = movie.Title;
			onMovieSelect(movie)
		})

		list.appendChild(option)
		results.appendChild(list)
	}
}

const input = document.querySelector('input');

input.addEventListener('input', debounce(onInput))

// document.addEventListener('click', event => {
// 	if (!root.contains(event.target)) {
// 		results.classList.add('invisible')
// 	}
// })

const onMovieSelect = async movie => {
	const response = await axios.get(url, {
		params: {
			apikey: "b24ef25a",
			i: movie.imdbID
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
	`
}