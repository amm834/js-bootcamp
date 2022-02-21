const express = require('express')
const productRepo = require('../../repositories/product')
const productNewTempalte = require('../../views/admin/product/new')
const productIndexTempalte = require('../../views/admin/product/index')
const productEditTempalte = require('../../views/admin/product/edit')
const {requireTitle, requirePrice} = require('../admin/validators')
const upload = require('../../storage/upload')
const {handleErrors, requireAuth} = require('./middlewares')

const router = express.Router()

router.get('/admin/products', requireAuth, async (req, res) => {
	const products = await productRepo.getAll();
	res.send(productIndexTempalte({products}))
})

router.get('/admin/products/new', requireAuth, (req, res) => {
	res.send(productNewTempalte({}))
})

router.post('/admin/products/new',
	requireAuth,
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

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
	const {id} = req.params;
	const product = await productRepo.getOne(id)
	if (!product) {
		return res.send('Product not found')
	}

	res.send(productEditTempalte({product}))
})

router.post('/admin/products/:id/edit',
	upload.single('image'),
	[requireTitle, requirePrice],

	handleErrors(productEditTempalte, async req => {
		const product = await productRepo.getOne(req.params.id)
		return {product}
	}),
	async (req, res) => {
		const {id} = req.params;
		const product = await productRepo.getOne(id)
		res.send(productEditTempalte({product}))
	}
)

module.exports = router;