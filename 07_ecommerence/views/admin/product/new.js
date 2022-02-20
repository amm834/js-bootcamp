const errors = require('../../helper')
const layout = require('../layout')

module.exports = ({errors}) => {
	return layout({
		content: `
<section class="row">
	<form class="col-md-8 offset-md-2 card p-5" method="post">
	<h3 class="text-center mb-3">Create Product</h3>
		<div class="mb-3">
				<input name="title" class="form-control" placeholder="Title">
		</div>
		<div class="mb-3">
				<input name="price" class="form-control" placeholder="Price">
		</div>
		<div class="mb-3">
				<input type="file" name="image" class="form-control">
		</div>
		<button class="btn btn-success" type="submit">Create</button>
</form>
</section>
		`
	})
}