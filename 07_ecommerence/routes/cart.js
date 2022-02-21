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

	console.log(cart)
	res.send('cart added')
})

module.exports = router;