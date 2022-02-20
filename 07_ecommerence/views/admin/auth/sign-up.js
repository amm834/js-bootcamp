const layout = require('../layout')
const {getErrors} = require('../../helper')

module.exports = ({errors}) => {
	return layout({
		content: `
  <section class="row">
    <div class="col-md-8 offset-md-2">
        <h1 class="text-center mb-5">Sign Up</h1>
        <form method="post" class="card p-5">
            <div class="mb-3">
                <input placeholder="email" name="email" class="form-control">
                <div class="text-danger">
                    ${getErrors(errors, 'email')}
                </div>
            </div>
            <div class="mb-3">
                <input placeholder="password" name="password" class="form-control">
                <div class="text-danger">
                    ${getErrors(errors, 'password')}
                </div>
            </div>
            <div class="mb-3">
                <input placeholder="confirm password" name="confirmPassword" class="form-control">
                <div class="text-danger">
                    ${getErrors(errors, 'confirmPassword')}
                </div>
            </div>
            <button class="btn btn-success" type="submit">Sign Up</button>
        </form>
    </div>
</section>
 
`
	})
}
