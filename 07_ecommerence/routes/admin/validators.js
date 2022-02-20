const {check} = require("express-validator");
const userRepo = require("../../repositories/users");

module.exports = {
	requireTitle: check('title')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Title must provide'),
	requirePrice: check('price')
		.trim()
		.isFloat()
		.toFloat()
		.withMessage('Price must be provided with minimum 1$'),
	requireEmail: check('email')
		.trim().normalizeEmail()
		.isEmail()
		.withMessage('Must be valid email')
		.custom(async email => {
			const exsitingUser = await userRepo.getOneBy(email);
			if (exsitingUser) {
				throw new Error('User with that email is already exists')
			}
		})
	,
	requirePassword: check('password')
		.trim().isLength({min: 4, max: 20})
		.withMessage('Must have 4 to 20 character')
	,
	requirePasswordConfirmation: check('confirmPassword')
		.trim()
		.isLength({min: 4, max: 20})
		.withMessage('Must have 4 to 20 character')
		.custom(async (confirmPassword, {req}) => {
			const {password} = req.body;
			if (password !== confirmPassword) {
				throw new Error('Passwords not match.')
			}
		}),
	requireEmailExists: check('email').trim().normalizeEmail().isEmail()
		.withMessage('Invalid email')
		.custom(async (email) => {
			const user = await userRepo.getOneBy({email});

			if (!user) {
				throw new Error('No user with that email.')
			}
		}),
	requireUserPasswordValidataion: check('password').trim()
		.custom(async (password, {req}) => {
			const {email} = req.body;
			const user = await userRepo.getOneBy({email});
			if (!user) {
				throw new Error('Invalid password')
			}
			const validPassword = await userRepo.comparePassword(
				user.password,
				password
			)
			if (!validPassword) {
				throw new Error('Invalid password');
			}
		}),
}