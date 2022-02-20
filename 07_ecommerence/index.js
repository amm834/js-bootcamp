const express = require('express')
const bodyParser = require("body-parser");
const userRepo = require('./repositories/users')
const cookieSession = require('cookie-session')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({
	keys: ['a secret key']
}))


app.get('/', (req, res) => {
	res.send(`
	
	<div>${req.session.userId}</div>
    <form method="post">
    <input type="email" placeholder="email" name="email">
    <input type="password" placeholder="password" name="password">
    <input type="password" placeholder="confirm password" name="confirmPassword">
    <button type="submit">Sign Up</button>
	</form>
    `)
})


app.post('/', async (req, res) => {
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


app.listen(3000, () => {
	console.log('Server is running at port 3000')
})
