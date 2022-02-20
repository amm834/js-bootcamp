const userRepo = require("../../repositories/users");
const express = require('express')
const router = express.Router();

router.get('/sign-up', (req, res) => {
	res.send(`
    <form method="post">
    <input type="email" placeholder="email" name="email">
    <input type="password" placeholder="password" name="password">
    <input type="password" placeholder="confirm password" name="confirmPassword">
    <button type="submit">Sign Up</button>
	</form>
    `)
})


router.post('/sign-up', async (req, res) => {
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
	res.send(`
	 <form method="post">
    <input type="email" placeholder="email" name="email">
    <input type="password" placeholder="password" name="password">
    <button type="submit">Sign In</button>
	</form>
	`)
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