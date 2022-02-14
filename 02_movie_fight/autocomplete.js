const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {

	root.innerHTML = `
		<label class="form-label">Search</label>
        <input type="search" class="input form-control" 
        />
        <ul class="results mt-2 invisible list-group"></ul>
`
	const input = root.querySelector('.input');
	const results = root.querySelector('.results')


	const onInput = async (event) => {
		const items = await fetchData(event.target.value)
		if (!items.length) {
			results.classList.add('invisible')
			return;
		}

		results.innerHTML = ''
		results.classList.remove('invisible')

		for (const item of items) {

			const option = document.createElement('a')
			option.classList.add('list-group-item')

			option.innerHTML = renderOption(item)

			results.appendChild(option)

			option.addEventListener('click', () => {
				results.classList.add('invisible');
				input.value = inputValue(item);
				onOptionSelect(item)
			})
		}
	}


	input.addEventListener('input', debounce(onInput))

	document.addEventListener('click', event => {
		if (!root.contains(event.target)) {
			results.classList.add('invisible')
		}
	})
}