const assert = require("assert");
it('should have a input', async () => {
	const dom = await render('index.html')

	const input = dom.window.document.querySelector('input')
	assert(input)
})

it('shows an valid email message', async function () {
	const dom = await render('index.html')

	const input = dom.window.document.querySelector('input')
	input.value = 'amm@gmail.com'
	dom.window.document
		.querySelector('form')
		.dispatchEvent(new dom.window.Event('submit'))

	const header = dom.window.document.querySelector('h1')
	assert.strictEqual(header.innerHTML, 'Valid email')

});