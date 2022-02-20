const express = require('express')
const productNewTempalte = require('../../views/admin/product/new')
const {validationResult} = require('express-validator')
const {requireTitle, requirePrice} = require('../admin/validators')

const router = express.Router()

router.get('/admin/products', (req, res) => {
})

router.get('/admin/products/new', (req, res) => {
	res.send(productNewTempalte({}))
})

router.post('/admin/products/new', [requireTitle, requirePrice],
	(req, res) => {
		const errors = validationResult(req)
		console.log(errors)
	})

module.exports = router;