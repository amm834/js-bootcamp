const express = require('express')
const bodyParser = require("body-parser");
const userRepo = require('./repositories/users')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
	res.send(`
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
		return res.send('Passowrds not match.')
	}

	res.send('Account created.')
})


app.listen(3000, () => {
	console.log('Server is running at port 3000')
})
