const userRepo = require("../../repositories/users");
const express = require('express')
const signupTemplate = require('../../views/admin/auth/sign-up')
const signinTemplate = require('../../views/admin/auth/sign-in')
const {check, validationResult} = require('express-validator')

const router = express.Router();

router.get('/sign-up', (req, res) => {
	res.send(signupTemplate())
})


router.post('/sign-up', [
	check('email').trim().isEmail(),
	check('password').trim().isLength({
		min: 4,
		max: 20
	}),
	check('password').trim().isLength({
		min: 4,
		max: 20
	})
], async (req, res) => {
	const {errors} = validationResult(req)
	console.log(errors)
	const {email, password, confirmPassword} = req.body;

	const exsitingUser = await userRepo.getOneBy({email});
	if (exsitingUser) {
		return res.send('User with that email is already exists.')
	}

	if (password !== confirmPassword) {
		return res.send('Passwords not match.')
	}

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