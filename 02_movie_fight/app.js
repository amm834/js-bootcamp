const url = 'http://www.omdbapi.com/'

const root = document.querySelector('.autocomplete')
root.innerHTML = `
            <div class="dropdown">
                <input type="search" class="dropdown-toggle form-control" data-bs-toggle="dropdown"/>
                <ul class="dropdown-menu results mt-2 invisible"></ul>
            </div>
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

	results.classList.remove('invisible')
	for (const movie of movies) {
		const option = document.createElement('a')
		option.classList.add('dropdown-item')

		option.innerHTML = `
		<img src="${movie.Poster}" alt="${movie.Title}" width="50">
		${movie.Title}
		`;
		results.appendChild(option)
	}
}

const input = document.querySelector('input');

input.addEventListener('input', debounce(onInput))