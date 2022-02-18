document.querySelector('form').addEventListener('submit', event => {
	event.preventDefault();
	const message = document.querySelector('#message')
	console.log(message.value)
})