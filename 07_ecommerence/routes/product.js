const express = require('express')
const productRepo = require('../repositories/product')
const productTemplate = require('../views/product')

const router = express.Router()

router.get('/', async (req, res) => {
	const products = await productRepo.getAll();
	res.send(productTemplate({products}))
})

module.exports = router;