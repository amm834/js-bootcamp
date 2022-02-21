const express = require('express')
const cartRepo = require('../repositories/cart')

const router = express.Router()

router.post('/cart/products', async (req, res) => {
	let cart;
	if (!req.session.userId) {
		cart = await cartRepo.create({items: []})
		req.session.userId = cart._id
	} else {
		cart = await cartRepo.getOne(req.session.userId)
	}

	const existingItem = cart.items.find(item => item.id === req.body.productId)
	if (existingItem) {
		existingItem.quantity++;
	} else {
		cart.items.push({id: req.body.productId, quantity: 1})
	}

	await cartRepo.update(req.session.userId, cart)
	res.send('cart added')
})

module.exports = router;