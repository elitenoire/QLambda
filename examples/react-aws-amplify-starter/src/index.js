import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'
import 'boba/dist/boba-extended.min.css'
import { Authenticator, DisplayMode } from './context'
import App from './App'
import config from './aws-exports'
import * as serviceWorker from './serviceWorker'

Amplify.configure(config)
// Log AWS amplify
window.LOG_LEVEL = 'DEBUG'

ReactDOM.render(
	<DisplayMode>
		<Authenticator>
			<App />
		</Authenticator>
	</DisplayMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
