import React, { useEffect, useReducer } from 'react'
import { Auth } from 'aws-amplify'

const initialState = { user: {}, authState: null, error: null }
export const AuthContext = React.createContext(initialState)

const authReducer = (state, { type, user, error }) => {
	switch (type) {
		case 'SIGNEDIN':
			return { ...state, user, authState: 'signedIn', error: null }
		case 'SIGNIN':
			return { ...state, user: {}, authState: 'signIn', error }
		case 'SIGNUP':
			return { ...state, user: {}, authState: 'signUp', error }
		case 'CONFIRM_SIGNUP':
			return { ...state, user, authState: 'confirmSignUp', error }
		case 'RESEND_SIGNUP':
			return { ...state, user, authState: 'resendSignUp', error }
		default:
			return { ...state, error: error || null }
	}
}

const Authenticator = ({ children }) => {
	// State Reducer
	const [state, dispatch] = useReducer(authReducer, initialState)

	// Check for authenticated user
	const checkUser = async _ => {
		console.log('Checking if user is authenticated')
		try {
			const user = await Auth.currentAuthenticatedUser()
			// User is signed in
			dispatch({ type: 'SIGNEDIN', user })
		} catch (err) {
			console.log({ err })
			// User needs to sign in
			dispatch({ type: 'SIGNIN', error: null })
		}
	}
	// Perform auth check
	useEffect(() => {
		checkUser()
	}, [])

	return (
		<AuthContext.Provider value={{ state, dispatch, checkUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default Authenticator
