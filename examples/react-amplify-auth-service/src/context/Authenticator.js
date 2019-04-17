import React, { useEffect, useReducer } from 'react'
import { Auth } from 'aws-amplify'
import {
	SIGNIN,
	SIGNEDIN,
	SIGNUP,
	CONFIRM_SIGNUP,
	FORGOT_PASSWORD,
	RESET_PASSWORD,
} from '../utils/constants'

const initialState = { user: {}, authState: null, error: null, msg: null }
export const AuthContext = React.createContext(initialState)

const authReducer = (state, { type, user = {}, error = null, msg = null }) => {
	switch (type) {
		case SIGNEDIN:
		case SIGNIN:
		case SIGNUP:
		case CONFIRM_SIGNUP:
		case FORGOT_PASSWORD:
		case RESET_PASSWORD:
			return { user, authState: type, error, msg }
		default:
			return { ...state, error, msg }
	}
}

const Authenticator = ({ children }) => {
	// State Reducer
	const [state, dispatch] = useReducer(authReducer, initialState)
	// Authentication status
	const isAuth = state.authState === SIGNEDIN
	// Check for authenticated user
	const checkUser = async _ => {
		console.log('Checking if user is authenticated')
		try {
			const user = await Auth.currentAuthenticatedUser()
			// User is signed in
			dispatch({ type: SIGNEDIN, user })
		} catch (err) {
			console.log({ err })
			// User needs to sign in
			dispatch({ type: SIGNIN, error: null })
		}
	}
	// Perform auth check
	useEffect(() => {
		checkUser()
	}, [])

	return (
		<AuthContext.Provider value={{ state, dispatch, checkUser, isAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export default Authenticator
