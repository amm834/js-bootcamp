const url = 'http://www.omdbapi.com/'

const fetchData = async (searchTerm) => {
	const response = await axios.get(url, {
		params: {
			apikey: "b24ef25a",
			s: searchTerm
		}
	})
	return response.data.Search;
}


const onInput = async (event) => {
	const movies = await fetchData(event.target.value)
	console.log(movies)
}

const input = document.querySelector('input');

input.addEventListener('input', debounce(onInput))