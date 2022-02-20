const userRepo = require("../../repositories/users");
const express = require('express')
const signupTemplate = require('../../views/admin/auth/sign-up')
const signinTemplate = require('../../views/admin/auth/sign-in')
const {check, validationResult} = require('express-validator')
const {requireEmail, requirePassword, requirePasswordConfirmation} = require('./validators')

const router = express.Router();

router.get('/sign-up', (req, res) => {
	res.send(signupTemplate())
})


router.post('/sign-up', [
	requireEmail, requirePassword, requirePasswordConfirmation
], async (req, res) => {
	const {errors} = validationResult(req)
	console.log(errors)

	const {email, password} = req.body;
	const user = await userRepo.create({email, password})
	req.session.userId = user._id;
	res.send('Account created.')
})

router.get('/sign-in', (req, res) => {
	res.send(signinTemplate())
})

router.post('/sign-in', async (req, res) => {
	const {email, password} = req.body;

	const user = await userRepo.getOneBy({email});

	if (!user) {
		return res.send('No user with that email.')
	}

	const validPassword = await userRepo.comparePassword(
		user.password,
		password
	)
	if (!validPassword) {
		return res.send('Invalid password');
	}

	req.session.userId = user._id;
	res.send('You are logged in.')
})


router.get('/sign-out', (req, res) => {
	req.session = null;

	res.send('You have been logged out.')
})

module.exports = router;