const assert = require("assert");
it('should have a input', async () => {
	const dom = await render('index.html')

	const input = dom.window.document.querySelector('input')
	assert(input)
})