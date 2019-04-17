import React from 'react'
import { useMedia } from 'use-media'

export const DisplayContext = React.createContext({})

const DisplayMode = ({ children }) => {
	const isSmallScreen = useMedia({ maxWidth: '991px' })
	const isBigScreenPortrait = useMedia({
		minWidth: '992px',
		orientation: 'portrait',
	})
	const isPortrait = isSmallScreen || isBigScreenPortrait

	return (
		<DisplayContext.Provider value={{ isPortrait }}>
			{children}
		</DisplayContext.Provider>
	)
}

export default DisplayMode
