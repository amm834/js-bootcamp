const layout = require('./layout')

module.exports = () => layout({
	content: `
	 <form method="post">
    <input type="email" placeholder="email" name="email">
    <input type="password" placeholder="password" name="password">
    <button type="submit">Sign In</button>
	</form>
	`
})
