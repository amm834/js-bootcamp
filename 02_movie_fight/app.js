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
		list.appendChild(option)
		results.appendChild(list)

		option.addEventListener('click', () => {
			results.classList.add('invisible');
			input.value = movie.Title;
		})
	}
}

const input = document.querySelector('input');

input.addEventListener('input', debounce(onInput))

// document.addEventListener('click', event => {
// 	if (!root.contains(event.target)) {
// 		results.classList.add('invisible')
// 	}
// })