import React, { useContext } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { AuthContext } from './context/Authenticator'
import Start from './screens/Start'
// import { withAuthenticator } from "aws-amplify-react";
import { useAuth } from './hooks'

const App = ({ location }) => {
	const { state } = useContext(AuthContext)
	const { signOut } = useAuth()
	// Transition animation
	const transitions = useTransition(location, l => l.pathname, {
		initial: null,
		from: {
			opacity: 0,
			transform: 'translate3d(100%,0,0)',
		},
		enter: {
			opacity: 1,
			transform: 'translate3d(0%,0,0)',
		},
		leave: {
			opacity: 0,
			transform: 'translate3d(-100%,0,0)',
		},
	})
	// Loading screen while checking auth status
	if (!state.authState) return <h1>LOADING...</h1>
	// Temporary sign out hack
	if (state.authState === 'SIGNEDIN') {
		console.log('Signing out...')
		// Call async function in useEffect - but too lazy
		// Hence react warns
		return signOut()
	}

	return (
		<div style={{ position: 'relative' }}>
			{transitions.map(({ item, key, props }) => (
				<animated.div
					key={key}
					style={{ ...props, position: 'absolute', height: '100vh' }}
					class="w-100"
				>
					<Switch location={item}>
						<Route exact path="/" component={Start} />
					</Switch>
				</animated.div>
			))}
		</div>
	)
}

// export default withAuthenticator(App, { includeGreetings: true });
export default withRouter(App)
