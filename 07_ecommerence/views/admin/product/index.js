const layout = require('../layout')

const card = (products) => {
	return products.map(product => {
		return `	
	<tr>
	<td>${product.title}</td>
	<td>${product.price}</td>
	<td><button class="btn btn-danger">Delete</button></td>
	<td><a href="/admin/products/${product._id}/edit" class="btn btn-info">Edit</a></td>
</tr>
</div>`
	}).join('')
}
module.exports = ({products}) => {
	return layout({
		content: `
	<h2 class="mb-3">Products</h2>
	<a class="btn btn-success" href="/admin/products/new" >Create</a>

	<table class="table">
	${card(products)}
</table>
		`
	})
}