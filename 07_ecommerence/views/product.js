const layout = require('./admin/layout')

const card = (products) => {
	return products.map(product => {
		return `
		<div class="col-md-4">
		<div class="card">
		<img src="http://${product.image}" alt="${product.title}" class="card-img-top" height="200">
		<form action="/cart/products" method="post">
		<input type="hidden" name="productId" value="${product._id}">
		<button class="btn btn-success">Add To Cart</button>
</form>
</div>
		</div>
		`
	}).join('')
}
module.exports = ({products}) => {
	return layout({
		content: `
	<div class="row">
	${card(products)}
</div>
	`
	})
}