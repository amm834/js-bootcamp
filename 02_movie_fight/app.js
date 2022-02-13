const url = 'http://www.omdbapi.com/'

const fetchData = async () => {
	const movies = await axios.get(url, {
		params: {
			apikey: "b24ef25a",
			s: "avengers"
		}
	})
	console.log(movies)
}

fetchData()