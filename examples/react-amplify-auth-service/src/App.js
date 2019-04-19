import React, { useContext } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { AuthContext } from './context/Authenticator'
import Start from './screens/Start'
import { useAuth } from './hooks'

import { Base, Layer, Background } from './styles'
import { Button } from './form'

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
	// Temporary Welcome Page until protected route is implemented
	if (state.authState === 'SIGNEDIN') {
		return (
			<Background>
				<Base>
					<Layer className="text-center">
						<h1>WELCOME</h1>
						<Button
							className="large rounded border-none mt-4"
							onClick={signOut}
						>
							Sign Out
						</Button>
					</Layer>
				</Base>
			</Background>
		)
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

export default withRouter(App)
