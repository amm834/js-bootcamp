const express = require('express')
const app = express()

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
	req.on('data', data => {
		const rawFormdata = data.toString()
		const parsed = rawFormdata.split('&')
		const formData = {}
		for (const data of parsed) {
			const [key, value] = data.split('=')
			formData[key] = value;
		}
		console.log(formData)
	})
})


app.listen(3000, () => {
	console.log('Server is running at port 3000')
})
