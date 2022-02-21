const layout = require('../layout')

const carts = (items) => {
	return items.map(item => {
		return `
		<div>${item.product.title} - ${item.product.price}</div>
		`
	}).join('')
}

module.exports = ({items}) => {
	return layout({
		content: `
		<div>${carts(items)}</div>
		`
	})
}