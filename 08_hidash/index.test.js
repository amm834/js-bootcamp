const {forEach} = require('./index')

let sum = 0;
forEach([1, 2, 3], (value) => {
	sum += value;
})

if (sum !== 6) {
	throw new Error('Excepted summing is to equal 6')
}