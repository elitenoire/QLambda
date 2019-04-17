import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Amplify from 'aws-amplify'
import 'boba/dist/boba-extended.min.css'
import { Authenticator, DisplayMode } from './context'
import App from './App'
import config from './aws-exports'
import * as serviceWorker from './serviceWorker'

Amplify.configure(config)
// Log AWS amplify
if (process.env.NODE_ENV === 'development') {
	window.LOG_LEVEL = 'DEBUG'
}

ReactDOM.render(
	<DisplayMode>
		<Authenticator>
			<Router>
				<App />
			</Router>
		</Authenticator>
	</DisplayMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
