const express = require('express')
const productRepo = require('../../repositories/product')
const productNewTempalte = require('../../views/admin/product/new')
const {requireTitle, requirePrice} = require('../admin/validators')
const upload = require('../../storage/upload')
const {handleErrors} = require('./middlewares')

const router = express.Router()

router.get('/admin/products', (req, res) => {
})

router.get('/admin/products/new', (req, res) => {
	res.send(productNewTempalte({}))
})

router.post('/admin/products/new',
	upload.single('image'),
	[requireTitle, requirePrice],
	handleErrors(productNewTempalte),
	async (req, res) => {
		let imageUrl;
		if (req.file && req.file.originalname) {
			// filename form destination
			imageUrl = 'localhost:3000/images/' + req.file.filename
		}
		const {title, price} = req.body;
		await productRepo.create({
			title,
			price,
			image: imageUrl
		})
		res.send('Product created');
	}
)
;

module.exports = router;