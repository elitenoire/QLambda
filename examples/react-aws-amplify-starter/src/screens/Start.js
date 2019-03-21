import React, { useState } from 'react'
import { useMedia } from 'use-media'
import AppProfile from '../components/AppProfile'
import Authentication from '../components/Authentication'

const Start = () => {
	const isSmallScreen = useMedia({ maxWidth: '991px' })
	const isBigScreenPortrait = useMedia({
		minWidth: '992px',
		orientation: 'portrait',
	})
	const isPortrait = isSmallScreen || isBigScreenPortrait

	const [showAuth, setShowAuth] = useState(false)

	return (
		<div class="section p-0">
			<div class="row gapless">
				{(!showAuth || !isPortrait) && (
					<div class={`col xs-12${isPortrait ? '' : ' lg-5 xl-6'}`}>
						<AppProfile
							isPortrait={isPortrait}
							setShowAuth={() => setShowAuth(true)}
						/>
					</div>
				)}
				{(showAuth || !isPortrait) && (
					<div class={`col xs-12${isPortrait ? '' : ' lg-7 xl-6'}`}>
						<Authentication isPortrait={isPortrait} />
					</div>
				)}
			</div>
		</div>
	)
}

export default Start
