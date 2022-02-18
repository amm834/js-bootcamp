const {hash} = window.location;

const message = atob(hash.replace('#', ''));
if (message) {
	document.querySelector('#message-show').classList.remove('d-none')
	document.querySelector('#message-form').classList.add('d-none')

	document.querySelector('h1').innerHTML = message;
}

document.querySelector('form').addEventListener('submit', event => {
	event.preventDefault();

	document.querySelector('#message-form').classList.add('d-none')
	document.querySelector('#link-form').classList.remove('d-none')

	const message = document.querySelector('#message-input')
	const encrypted = btoa(message.value);
	const linkInput = document.querySelector('#link-input')
	linkInput.value = `${window.location}#${encrypted}`;
	linkInput.select()
})