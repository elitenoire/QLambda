import { useContext } from 'react'
import { Auth } from 'aws-amplify'
import { AuthContext } from '../context'
import {
	SIGNIN,
	SIGNEDIN,
	SIGNUP,
	CONFIRM_SIGNUP,
	FORGOT_PASSWORD,
	RESET_PASSWORD,
} from '../utils/constants'

export default _ => {
	const {
		state: { user, authState, error },
		dispatch,
	} = useContext(AuthContext)

	// User Sign In
	const signIn = async (username, password) => {
		try {
			const user = await Auth.signIn(username, password)
			//console.log({ user })
			dispatch({ type: SIGNEDIN, user })
		} catch (err) {
			if (err.code === 'UserNotConfirmedException') {
				// Resend code and confirm user
				await resendSignUp(username, false)
			} else if (err.code === 'NotAuthorizedException') {
				// TODO: Display incorrect password error
				dispatch({ error: 'Password is incorrect' })
			} else if (err.code === 'UserNotFoundException') {
				// TODO: Display username/email doesn't exist
				dispatch({ error: 'User does not exist' })
			} else {
				console.log({ err })
				dispatch({ error: err.message })
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
			dispatch({ type: SIGNUP, error: err.message })
		}
	}
	// Confirm User Sign Up
	const confirmSignUp = async (username, code) => {
		try {
			const data = await Auth.confirmSignUp(username, code)
			// TODO: or use checkUser instead
			console.log({ data }) // { data: 'SUCCESS'}
			dispatch({ type: SIGNIN, msg: 'Success! Please sign in' })
		} catch (err) {
			console.log({ err })
			dispatch({ error: err.message })
		}
	}
	// Resend User Sign Up code
	const resendSignUp = async (username, withAlert = true) => {
		try {
			const data = await Auth.resendSignUp(username)
			console.log({ data })
			dispatch({
				type: CONFIRM_SIGNUP,
				user: { username },
				msg: withAlert ? 'Code sent!' : null,
			})
			// return true
		} catch (err) {
			console.log({ err })
			dispatch({
				type: CONFIRM_SIGNUP,
				user: { username },
				error: err.message,
			})
		}
	}
	// User Sign Out
	const signOut = async _ => {
		try {
			const data = await Auth.signOut()
			console.log({ data })
			dispatch({ type: SIGNIN })
		} catch (err) {
			console.log({ err })
			dispatch({ error: err.message })
		}
	}

	return {
		user,
		authState,
		error,
		isAuth: authState === SIGNEDIN,
		dispatch,
		signIn,
		signUp,
		confirmSignUp,
		resendSignUp,
		signOut,
	}
}
