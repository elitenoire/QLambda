import React, { useState, useContext } from 'react'
import Lottie from '../components/Lottie'
import AppProfile from '../components/AppProfile'
import LoginSignup from '../components/LoginSignup'
import ConfirmSignup from '../components/ConfirmSignup'
import ForgotPassword from '../components/ForgotPassword'
import ResetPassword from '../components/ResetPassword'
import { DisplayContext, AuthContext } from '../context/'
import {
	CONFIRM_SIGNUP,
	FORGOT_PASSWORD,
	RESET_PASSWORD,
} from '../utils/constants'
import { Background } from '../styles'
import animationData from '../lotties/splash-plane.json'

const Start = () => {
	const { isPortrait } = useContext(DisplayContext)
	const {
		state: { authState },
	} = useContext(AuthContext)

	const [showAuth, setShowAuth] = useState(false)
	const [playLottie, setPlayLottie] = useState(true)

	switch (authState) {
		case CONFIRM_SIGNUP:
			return <ConfirmSignup />
		case FORGOT_PASSWORD:
			return <ForgotPassword />
		case RESET_PASSWORD:
			return <ResetPassword />
		default:
			return (
				<Background class="section p-0">
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
										animationData={animationData}
										onEnd={_ => setPlayLottie(false)}
										full
									/>
								)}
								{(!playLottie || !isPortrait) && (
									<LoginSignup isPortrait={isPortrait} />
								)}
							</div>
						)}
					</div>
				</Background>
			)
	}
}

export default Start
