import { useContext } from 'react'
import { Auth } from 'aws-amplify'
import { AuthContext } from '../context'
import {
	SIGNIN,
	SIGNEDIN,
	SIGNUP,
	CONFIRM_SIGNUP,
	RESET_PASSWORD,
} from '../utils/constants'

export default _ => {
	const {
		state: { user, authState, error, msg },
		dispatch,
	} = useContext(AuthContext)

	// User Sign In
	const signIn = async (username, password) => {
		try {
			const user = await Auth.signIn(username, password)
			console.log({ user })
			dispatch({ type: SIGNEDIN, user })
		} catch (err) {
			if (err.code === 'UserNotConfirmedException') {
				// Resend code and confirm user
				await resendSignUp(username, false)
			} else if (err.code === 'NotAuthorizedException') {
				// Display incorrect password error
				dispatch({ error: 'Username or password is incorrect' })
			} else if (err.code === 'UserNotFoundException') {
				// Display username/email doesn't exist
				dispatch({ error: 'Username or password is incorrect' })
			} else {
				console.log({ err })
				dispatch({ error: err.message || err })
			}
		}
	}
	// User Sign Up
	const signUp = async ({ username, password, attributes }) => {
		try {
			const { user, userConfirmed, userSub } = await Auth.signUp({
				username,
				password,
				attributes,
			})
			console.log({ user, userConfirmed, userSub })
			dispatch({ type: CONFIRM_SIGNUP, user })
		} catch (err) {
			console.log({ err })
			if (err.code === 'UsernameExistsException') {
				dispatch({ error: 'User already exists' })
			} else {
				dispatch({ type: SIGNUP, error: err.message || err })
			}
		}
	}
	// Confirm User Sign Up
	const confirmSignUp = async (username, code) => {
		try {
			await Auth.confirmSignUp(username, code)
			// Redirect to sign in
			dispatch({
				type: SIGNIN,
				user: { username },
				msg: 'Your account has been confirmed',
			})
		} catch (err) {
			console.log({ err })
			if (err.code === 'ExpiredCodeException') {
				// Invalid code provided, request code again
				dispatch({ error: 'Code has expired. Resend' })
			} else if (err.code === 'CodeMismatchException') {
				dispatch({ error: 'Code is invalid. Retry' })
			} else {
				dispatch({ error: err.message || err })
			}
		}
	}
	// Resend User Sign Up code
	const resendSignUp = async (username, withAlert = true) => {
		try {
			const data = await Auth.resendSignUp(username)
			console.log({ data }) // CodeDeliveryDetails
			dispatch({
				type: CONFIRM_SIGNUP,
				user: { username },
				msg: withAlert ? 'Code sent!' : null,
			})
		} catch (err) {
			console.log({ err })
			dispatch({
				type: CONFIRM_SIGNUP,
				user: { username },
				error: err.message || err,
			})
		}
	}
	// User Forgot Password
	const forgotPassword = async (username, withAlert = false) => {
		try {
			const data = await Auth.forgotPassword(username)
			console.log({ data }) // CodeDeliveryDetails
			dispatch({
				type: RESET_PASSWORD,
				user: { username },
				msg: withAlert ? 'Code sent!' : null,
			})
		} catch (err) {
			console.log({ err })
			if (err.code === 'InvalidParameterException') {
				// No registered/verified email or phone_number
				dispatch({ error: 'Email address is not registered' })
			} else {
				dispatch({ error: err.message || err })
			}
		}
	}
	// User Reset Passord
	const resetPassword = async (username, code, new_password) => {
		try {
			await Auth.forgotPasswordSubmit(username, code, new_password)
			dispatch({
				type: SIGNIN,
				user: { username },
				msg: 'Your password has been reset',
			})
		} catch (err) {
			console.log({ err })
			if (err.code === 'ExpiredCodeException') {
				// Invalid code provided, request code again
				dispatch({ error: 'Code has expired. Resend' })
			} else if (err.code === 'CodeMismatchException') {
				dispatch({ error: 'Code is invalid. Retry' })
			} else {
				dispatch({ error: err.message || err })
			}
		}
	}
	// User Sign Out
	const signOut = async _ => {
		try {
			await Auth.signOut()
			dispatch({ type: SIGNIN })
		} catch (err) {
			console.log({ err })
			dispatch({ error: err.message || err })
		}
	}

	return {
		user,
		authState,
		error,
		msg,
		dispatch,
		signIn,
		signUp,
		confirmSignUp,
		resendSignUp,
		forgotPassword,
		resetPassword,
		signOut,
	}
}
