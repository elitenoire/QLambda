import React, { useContext } from 'react'
import { AuthContext } from './context/Authenticator'
import Start from './screens/Start'
// import { withAuthenticator } from "aws-amplify-react";
import { useAuth } from './hooks'

const App = _ => {
	const { state } = useContext(AuthContext)
	const { signOut } = useAuth()
	if (!state.authState) return <h1>LOADING...</h1>
	// Temporary sign out hack
	if (state.authState === 'SIGNEDIN') {
		console.log('Signing out...')
		// Call async function in useEffect - but too lazy
		// Hence react warns
		return signOut()
	}
	return <Start />
}

// export default withAuthenticator(App, { includeGreetings: true });
export default App
