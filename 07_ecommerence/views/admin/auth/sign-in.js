const layout = require('./layout')
const {getErrors} = require('../../helper')

module.exports = ({errors}) => layout({
	content: `
	 <form method="post">
    <input  placeholder="email" name="email">
    ${getErrors(errors, 'email')}
    <input placeholder="password" name="password">
        ${getErrors(errors, 'password')}
    <button type="submit">Sign In</button>
	</form>
	`
})
