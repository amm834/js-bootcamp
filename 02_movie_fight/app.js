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


function debounce(cb, delay = 500) {
	let timeoutID;
	return (...args) => {
		if (timeoutID) clearTimeout(timeoutID);
		timeoutID = setTimeout(() => {
			cb.apply(null, args)
		}, delay)
	}
}

let timeoutId;
const onInput = (event) => {
	fetchData(event.target.value)
}

const input = document.querySelector('input');

input.addEventListener('input', debounce(onInput))