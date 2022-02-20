const userRepo = require("../../repositories/users");
const express = require('express')
const signupTemplate = require('../../views/admin/auth/sign-up')
const signinTemplate = require('../../views/admin/auth/sign-in')
const {validationResult, check} = require('express-validator')
const {
	requireEmail,
	requirePassword,
	requirePasswordConfirmation,
	requireEmailExists,
	requireUserPasswordValidataion
} = require('./validators')

const router = express.Router();

router.get('/sign-up', (req, res) => {
	res.send(signupTemplate({}))
})


router.post('/sign-up', [
	requireEmail, requirePassword, requirePasswordConfirmation
], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.send(signupTemplate({errors}))
	}

	const {email, password} = req.body;
	const user = await userRepo.create({email, password})
	req.session.userId = user._id;
	res.send('Account created.')
})

router.get('/sign-in', (req, res) => {
	res.send(signinTemplate())
})

router.post('/sign-in',
	[
		requireEmailExists,
		requireUserPasswordValidataion
	],
	async (req, res) => {

		const errors = validationResult(req)
		console.log(errors)

		if (!errors.isEmpty()) {
			return res.send(signinTemplate());
		}
		const user = await userRepo.getOneBy({email: req.body.email});

		req.session.userId = user._id;
		res.send('You are logged in.')
	})


router.get('/sign-out', (req, res) => {
	req.session = null;

	res.send('You have been logged out.')
})

module.exports = router;