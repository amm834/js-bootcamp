const {forEach} = require('./index.js')
const assert = require('assert')

it('should sum array', () => {
	let result = 0;
	forEach([1, 2, 3], (value) => {
		result += value;
	})
	assert.strictEqual(result, 6)
})