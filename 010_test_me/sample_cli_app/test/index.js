module.exports = {
	forEach(arr, cb) {
		for (const index in arr) {
			const value = arr[index]
			cb(value, index)
		}
	}
}