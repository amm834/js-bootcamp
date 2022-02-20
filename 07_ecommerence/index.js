const express = require('express')
const app = express()

app.get('/', (req, res) => {
	res.send(`
    <form>
    <input type="email" placeholder="email">
    <input type="password" placeholder="password">
    <input type="password" placeholder="confirm password">
    <button type="submit">Sign Up</button>
	</form>
    `)
})

app.listen(3000, () => {
	console.log('Server is running at port 3000')
})
