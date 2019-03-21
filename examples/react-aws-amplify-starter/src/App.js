import React, { Component } from 'react'
import Start from './screens/Start'
// import { withAuthenticator } from "aws-amplify-react";

class App extends Component {
	render() {
		return <Start />
	}
}

// export default withAuthenticator(App, { includeGreetings: true });
export default App
