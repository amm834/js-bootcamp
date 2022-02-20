const express = require('express')
const bodyParser = require("body-parser");
const userRepo = require('./repositories/users')
const cookieSession = require('cookie-session')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({
	keys: ['a secret key']
}))

const authRoute = require('./routes/admin/auth')
app.use(authRoute)

app.listen(3000, () => {
	console.log('Server is running at port 3000')
})
