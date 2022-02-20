const express = require('express')
// const bodyParser = require("body-parser");
const app = express()
// app.use(bodyParser.urlencoded({extended: true}))

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

const bodyParse = (req, res, next) => {
	if (req.method === 'POST') {
		req.on('data', data => {
			const rawFormdata = data.toString()
			const parsed = rawFormdata.split('&')
			const formData = {}
			for (const data of parsed) {
				const [key, value] = data.split('=')
				formData[key] = value;
			}
			req.body = formData;
			next()
		})
	} else {
		next()
	}
}

app.post('/', bodyParse, (req, res) => {
	console.log(req.body)
})


app.listen(3000, () => {
	console.log('Server is running at port 3000')
})
