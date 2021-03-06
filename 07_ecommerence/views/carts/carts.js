const layout = require('../layout')

const carts = (items) => {
	return items.map(item => {
		return `
		<tr>
		<td>${item.product.title}</td>
		<td>${item.product.price}</td>
		<td>
		<form action="/cart/products/delete" method="post">
		<input type="hidden" name="productId" value="${item.product._id}">
		<button class="btn btn-danger">Delete </button> 
</form>
</td>
		<td>$${item.product.price * item.quantity}</td>
</tr>
		`
	}).join('')
}

module.exports = ({items}) => {

	const grandTotal = items.reduce((prev, item) => {
		return prev + item.product.price * item.quantity;
	}, 0)

	return layout({
		content: `
		<table class="table">
		<tr>
		<th>Title</th>
		<th>Price</th>
		<th>Action</th>
		<th>Total</th>
</tr>
${carts(items)}</table>
<tr>
<td colspan="3">
$${grandTotal}
</td>
</tr>
		`
	})

}