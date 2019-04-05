import { useContext } from 'react'
import { Auth } from 'aws-amplify'
import { AuthContext } from '../context/Authenticator'

export default _ => {
	const {
		state: { user, authState, error },
		dispatch,
	} = useContext(AuthContext)

	// User Sign In
	const signIn = async (username, password) => {
		try {
			const user = await Auth.signIn(username, password)
			console.log({ user })
			dispatch({ type: 'SIGNEDIN', user })
		} catch (err) {
			if (err.code === 'UserNotConfirmedException') {
				// Resend code and confirm user
				const isSent = await resendSignUp(username)
				if (isSent) {
					dispatch({ type: 'CONFIRM_SIGNUP', user: { username }, error: null })
				}
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
			dispatch({ type: 'CONFIRM_SIGNUP', user })
		} catch (err) {
			console.log({ err })
			dispatch({ error: err.message })
		}
	}
	// Confirm User Sign Up
	const confirmSignUp = async (username, code) => {
		try {
			const data = await Auth.confirmSignUp(username, code)
			// TODO: or use checkUser instead
			console.log({ data })
			dispatch({ type: 'SIGNIN', error: null })
		} catch (err) {
			console.log({ err })
			dispatch({ error: err.message })
		}
	}
	// Resend User Sign Up code
	const resendSignUp = async username => {
		try {
			const data = await Auth.resendSignUp(username)
			console.log({ data })
			return true
		} catch (err) {
			console.log({ err })
			dispatch({
				type: 'CONFIRM_SIGNUP',
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
			dispatch({ type: 'SIGNIN', error: null })
		} catch (err) {
			console.log({ err })
			dispatch({ error: err.message })
		}
	}

	return {
		user,
		authState,
		error,
		isAuth: authState === 'signedIn',
		dispatch,
		signIn,
		signUp,
		confirmSignUp,
		resendSignUp,
		signOut,
	}
}
