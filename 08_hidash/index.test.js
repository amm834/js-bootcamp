const assert = require('assert')
const {forEach, map} = require('./index')


it('Test for forEach', () => {
	let sum = 0;
	forEach([1, 2, 3], (value) => {
		sum += value;
	})
	assert.strictEqual(sum, 7);
})

it('Test for map', () => {
	const result = map([1, 2, 3], value => {
		return value * 2;
	})

	assert.deepStrictEqual(result, [2, 4, 6])
})
