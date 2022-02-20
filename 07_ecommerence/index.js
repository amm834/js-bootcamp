const express = require('express')
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session')
const authRoute = require('./routes/admin/auth')
const productRoute = require('./routes/admin/product')
const path = require("path");

const app = express()

app.use(express.static(path.join(__dirname,'/public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({
	keys: ['a secret key']
}))

// routes
app.use(authRoute)
app.use(productRoute)

app.listen(3000, () => {
	console.log('Server is running at port 3000')
})
