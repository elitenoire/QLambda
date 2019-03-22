const validate = values => {
	let errors = {}

	if (values.email !== undefined) {
		if (!values.email) {
			errors.email = 'Email address is required'
		} else if (!/\S+@\S+\.\S+/.test(values.email)) {
			errors.email = 'Email address is invalid'
		}
	}

	if (values.password !== undefined) {
		if (!values.password) {
			errors.password = 'Password is required'
		} else if (values.password.length < 6) {
			errors.password = 'Password must be 6 or more characters'
		}
	}

	if (values.confirmPassword !== undefined) {
		if (!values.confirmPassword) {
			errors.confirmPassword = 'Confirm Password is required'
		} else if (values.password && values.confirmPassword !== values.password) {
			errors.confirmPassword = 'Passwords must be a match'
		}
	}

	return errors
}

export default validate
