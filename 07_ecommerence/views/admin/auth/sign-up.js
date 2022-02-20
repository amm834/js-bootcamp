const layout = require('./layout')
const {getErrors} = require('../../helper')

module.exports = ({errors}) => {
	return layout({
		content: `
    <form method="post">
    <input placeholder="email" name="email">
    ${getErrors(errors, 'email')}
    <input  placeholder="password" name="password">
        ${getErrors(errors, 'password')}
    <input placeholder="confirm password" name="confirmPassword">
        ${getErrors(errors, 'confirmPassword')}

    <button type="submit">Sign Up</button>
	</form>
`
	})
}
