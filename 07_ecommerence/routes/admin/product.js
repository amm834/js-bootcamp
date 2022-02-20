const express = require('express')
const productNewTempalte = require('../../views/admin/product/new')


const router = express.Router()

router.get('/admin/products', (req, res) => {
})

router.get('/admin/products/new', (req, res) => {
	res.send(productNewTempalte({}))
})

module.exports = router;