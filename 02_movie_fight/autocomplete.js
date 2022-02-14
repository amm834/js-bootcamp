const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue}) => {

	root.innerHTML = `
        <input type="search"  class=" input dropdown-toggle form-control" data-bs-toggle="dropdown" 
        />
        <ul class="dropdown-menu results mt-2 invisible"></ul>
`
	const results = document.querySelector('.results')

	const fetchData = async (searchTerm) => {
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

			option.innerHTML = renderOption(movie)

			list.appendChild(option)
			results.appendChild(list)

			option.addEventListener('click', () => {
				results.classList.add('invisible');
				input.value = inputValue(movie);
				onOptionSelect(movie)
			})
		}
	}

	const input = document.querySelector('.input');

	input.addEventListener('input', util(onInput))

// document.addEventListener('click', event => {
// 	if (!root.contains(event.target)) {
// 		results.classList.add('invisible')
// 	}
// })
}