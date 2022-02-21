const express = require('express')
const cartRepo = require('../repositories/cart')
const cartTemplate = require('../views/carts/carts')
const productRepo = require('../repositories/product')

const router = express.Router()

router.post('/cart/products', async (req, res) => {
	let cart;
	if (!req.session.cartId) {
		cart = await cartRepo.create({items: []})
		req.session.cartId = cart._id
	} else {
		cart = await cartRepo.getOne(req.session.cartId)
	}

	const existingItem = cart.items.find(item => item.id === req.body.productId)
	if (existingItem) {
		existingItem.quantity++;
	} else {
		cart.items.push({id: req.body.productId, quantity: 1})
	}

	await cartRepo.update(req.session.cartId, cart)
	res.redirect('/')
})

router.get('/cart', async (req, res) => {
	const cart = await cartRepo.getOne(req.session.cartId)
	if (cart) {
		for (const item of cart.items) {
			const product = await productRepo.getOne(item.id)
			item.product = product
		}
		res.send(cartTemplate({items: cart.items}))
	} else {
		res.redirect('/')
	}
})

module.exports = router;