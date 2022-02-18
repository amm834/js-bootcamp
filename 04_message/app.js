document.querySelector('form').addEventListener('submit', event => {
	event.preventDefault();
	const message = document.querySelector('#message-input')
	document.querySelector('#link-input').value = btoa(message.value)
})