function util(cb, delay = 500) {
	let timeoutID;
	return (...args) => {
		if (timeoutID) clearTimeout(timeoutID);
		timeoutID = setTimeout(() => {
			cb.apply(null, args)
		}, delay)
	}
}