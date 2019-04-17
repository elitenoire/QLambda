import React, { useContext } from 'react'
import { Base, Layer, AuthCardStyles } from '../styles'
import { DisplayContext } from '../context/DisplayMode'
import Lottie from './Lottie'
import Alert from './Alert'

const { Card, Anime } = AuthCardStyles

const AuthCard = ({
	children,
	animationData,
	animationSize,
	extraData,
	extraSize,
	error,
	msg,
	dispatch,
}) => {
	const { isPortrait } = useContext(DisplayContext)

	return (
		<Base className="bg-tint-orange">
			<Layer>
				<div class="container" style={{ margin: '0 auto' }}>
					<Card className="bg-white pv-4 soft-shadow-hover-1">
						<div class="row gapless row-align-center">
							<div class={`col xs-12${isPortrait ? '' : ' lg-5 xl-5'}`}>
								<Anime class="p-2" size={animationSize}>
									<Lottie
										animationData={animationData}
										extra={extraData}
										extraSize={extraSize || '50%'}
										loop={true}
									/>
								</Anime>
							</div>
							<div class={`col xs-12${isPortrait ? '' : ' lg-7 xl-7'}`}>
								{children}
							</div>
						</div>
					</Card>
				</div>
			</Layer>
			<Alert
				color={
					isPortrait
						? msg
							? 'green filled'
							: 'bg-black filled'
						: msg
						? 'green'
						: 'orange'
				}
				text={error || msg}
				dispatch={dispatch}
			/>
		</Base>
	)
}

export default AuthCard
