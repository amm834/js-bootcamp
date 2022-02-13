const url = 'http://www.omdbapi.com/'

const fetchData = async (searchTerm) => {
	const response = await axios.get(url, {
		params: {
			apikey: "b24ef25a",
			s: searchTerm
		}
	})
	console.log(response.data)
}

let timeoutId;
const onInput = (event) => {
	if (timeoutId) {
		clearTimeout(timeoutId)
	}
	timeoutId = setTimeout(() => {
		fetchData(event.target.value)
	}, 500)
}

const input = document.querySelector('input');

input.addEventListener('input', onInput)