const express = require('express')
const bodyParser = require("body-parser");

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


app.post('/', (req, res) => {
	console.log(req.body)
})


app.listen(3000, () => {
	console.log('Server is running at port 3000')
})
