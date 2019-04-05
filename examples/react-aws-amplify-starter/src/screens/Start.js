import React, { useState } from 'react'
import { useMedia } from 'use-media'
import Lottie from 'react-lottie'
import animationData from '../lotties/flying-plane.json'
import AppProfile from '../components/AppProfile'
import LoginSignup from '../components/LoginSignup'

const defaultOptions = {
	loop: false,
	autoplay: true,
	animationData: animationData,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
}

const Start = () => {
	const isSmallScreen = useMedia({ maxWidth: '991px' })
	const isBigScreenPortrait = useMedia({
		minWidth: '992px',
		orientation: 'portrait',
	})
	const isPortrait = isSmallScreen || isBigScreenPortrait

	const [showAuth, setShowAuth] = useState(false)
	const [playLottie, setPlayLottie] = useState(true)

	// On end lottie animation
	const eventListeners = [
		{
			eventName: 'complete',
			callback: _ => setPlayLottie(false),
		},
	]

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
						{playLottie && isPortrait && (
							<Lottie
								options={defaultOptions}
								isClickToPauseDisabled={true}
								eventListeners={eventListeners}
								width="100vw"
								height="100vh"
							/>
						)}
						{(!playLottie || !isPortrait) && (
							<LoginSignup isPortrait={isPortrait} />
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default Start
