it('should show autocomplete', function () {
	createAutoComplete({
		root: document.querySelector('#target'),
		fetchData() {
			return [
				{Title: "One Piece"},
				{Title: "Dragon Ball Kid"},
				{Title: "Super Natural"},
			]
		},
		renderOption(movie) {
			return `${movie.Title}`
		}
	})
}); 