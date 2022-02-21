const layout = require('../layout')

const card = (products) => {
	return products.map(product => {
		return `	
	<tr>
	<td>${product.title}</td>
	<td>${product.price}</td>
		<td><a href="/admin/products/${product._id}/edit" class="btn btn-info">Edit</a></td
	<td><form action="/admin/products/${product._id}/delete" method="post">
	</td>
	<td>
	<button class="btn btn-danger">Delete</button>
</form></td>
</tr>
`
	}).join('')
}
module.exports = ({products}) => {
	return layout({
		content: `
	<h2 class="mb-3">Products</h2>
	<a class="btn btn-success" href="/admin/products/new" >Create</a>

	<table class="table mb-3">
	${card(products)}
</table>
		`
	})
}