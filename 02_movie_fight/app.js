const url = 'http://www.omdbapi.com/'

const root = document.querySelector('.autocomplete')
root.innerHTML = `
            <div class="dropdown">
                <input type="search" class="dropdown-toggle form-control" data-bs-toggle="dropdown"/>
                <ul class="dropdown-menu results w-100">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                </ul>
            </div>
`
const resultWrapper = document.querySelector('.results')

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
	for (const movie of movies) {
		const div = document.createElement('div')
		div.innerHTML = `
		<h1>${movie.Title}</h1>
		<img src="${movie.Poster}" alt="${movie.Title}">
		`;
		document.querySelector('#target').appendChild(div)
	}
}

const input = document.querySelector('input');

input.addEventListener('input', debounce(onInput))