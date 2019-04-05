import React, { useContext } from 'react'
import { AuthContext } from './context/Authenticator'
import Start from './screens/Start'
// import { withAuthenticator } from "aws-amplify-react";

const App = _ => {
	const { state } = useContext(AuthContext)
	if (!state.authState) return <h1>LOADING...</h1>
	return <Start />
}

// export default withAuthenticator(App, { includeGreetings: true });
export default App
