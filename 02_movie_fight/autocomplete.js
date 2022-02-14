const createAutoComplete = (
	{root, renderOption, onOptionSelect, inputValue, fetchData}
) => {

	root.innerHTML = `
        <input type="search"  class="input dropdown-toggle form-control" data-bs-toggle="dropdown" 
        />
        <ul class="dropdown-menu results mt-2 invisible"></ul>
`
	const results = document.querySelector('.results')


	const onInput = async (event) => {
		const items = await fetchData(event.target.value)
		if (!items.length) {
			results.classList.add('invisible')
			return;
		}

		results.innerHTML = ''
		results.classList.remove('invisible')

		for (const item of items) {
			const list = document.createElement('li')
			const option = document.createElement('a')
			option.classList.add('dropdown-item')

			option.innerHTML = renderOption(item)

			list.appendChild(option)
			results.appendChild(list)

			option.addEventListener('click', () => {
				results.classList.add('invisible');
				input.value = inputValue(item);
				onOptionSelect(item)
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