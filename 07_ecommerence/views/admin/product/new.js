const {getErrors} = require('../../helper')
const layout = require('../layout')

module.exports = ({errors}) => {
	return layout({
		content: `
<section class="row">
	<form class="col-md-8 offset-md-2 card p-5" method="post" enctype="multipart/form-data">
	<h3 class="text-center mb-3">Create Product</h3>
		<div class="mb-3">
				<input name="title" class="form-control" placeholder="Title">
				<div class="text-danger">${getErrors(errors, 'title')}</div>
		</div>
		<div class="mb-3">
				<input name="price" class="form-control" placeholder="Price">
				<div class="text-danger">${getErrors(errors, 'price')}</div>
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