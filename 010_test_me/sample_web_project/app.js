document.querySelector('form').addEventListener('submit', event => {
	event.preventDefault()
	const header = document.querySelector('h1')
	const input = document.querySelector('input')
	console.log(input.value)
	if (input.value.includes('@')) {
		header.innerHTML = 'Valid email'
	} else {
		header.innerHTML = 'Invalid email'
	}
})