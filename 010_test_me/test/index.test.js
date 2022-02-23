const {forEach} = require('./index.js')
const assert = require('assert')

beforeEach(() => {
	numbers = [1, 2, 3]
})

it('should sum array', () => {
	let result = 0;
	forEach([1, 2, 3], (value) => {
		result += value;
	})
	assert.strictEqual(result, 3)
})

it('shold be 3', () => {
	assert.strictEqual(numbers.length, 3)
})
