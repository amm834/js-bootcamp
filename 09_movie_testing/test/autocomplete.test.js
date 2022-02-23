const waitFor = (selector) => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			if (document.querySelector(selector)) {
				clearInterval(interval)
				clearTimeout(timeout)
				resolve()
			}
		}, 30)

		const timeout = setTimeout(() => {
			clearInterval(interval)
			reject()
		}, 2000)
	})
}

beforeEach(() => {
	document.querySelector('#target').innerHTML = ''
	createAutoComplete({
		root: document.querySelector('#target'),
		fetchData() {
			return [
				{Title: "One Piece"},
				{Title: "Dragon Ball Kid"},
				{Title: "Super Natural"},
			]
		},
		renderOption(movie) {
			return `${movie.Title}`
		}
	})
})

it('Dropdown starts open', function () {
	const dropdown = document.querySelector('.dropdown')
	expect(dropdown.className).not.to.include('is-active')
});

it('After searching shows dropdown', async function () {
	const input = document.querySelector('input')
	input.value = 'avengers'
	input.dispatchEvent(new Event('input'))

	await waitFor('.dropdown-item')

	const dropdown = document.querySelector('.dropdown')
	expect(dropdown.className).to.include('is-active')
});