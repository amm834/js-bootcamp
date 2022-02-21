module.exports = {
	forEach(arr, fn) {
		// for (let i = 0; i < arr.length; i++) {
		// 	const value = arr[i];
		// 	fn(value, i)
		// }

		for (const index in arr) {
			fn(arr[index], index)
		}
	}
}