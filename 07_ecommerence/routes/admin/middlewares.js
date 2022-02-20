const {validationResult} = require('express-validator')
module.exports = {
	handleErrors(templateFunc) {
		return (req, res, next) => {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.send(templateFunc({errors}))
			}
			next()
		}
	},
	requireAuth(req, res, next) {
		const {userId} = req.session;
		if (!userId) {
			res.redirect('/sign-in')
		}
		next()
	}
}
