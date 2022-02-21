const express = require('express')
const router = express.Router()

router.post('/cart/products', (req, res) => {
	console.log(req.body.productId)
})

module.exports = router;