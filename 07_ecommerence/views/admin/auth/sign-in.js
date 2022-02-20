const layout = require('./layout')
const {getErrors} = require('../../helper')

module.exports = ({errors}) => layout({
	content: `
	<section class="row">
    <div class="col-md-8 offset-md-2 ">
        <form method="post" class="card p-5">
            <h1 class="text-center mb-5">Sign In</h1>
            <div class="mb-3">
                <input placeholder="email" name="email" class="form-control">
                <div class="text-danger">    ${getErrors(errors, 'email')}
                </div>
            </div>
            <div class="mb-3">
                <input placeholder="password" name="password" class="form-control">
                <div class="text-danger"> ${getErrors(errors, 'password')}</div>
            </div>
            <button class="btn btn-success" type="submit">Sign In</button>

        </form>
    </div>
    </section>
	`
})
