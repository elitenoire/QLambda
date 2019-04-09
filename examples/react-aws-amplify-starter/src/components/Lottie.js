import React from 'react'
import LottieBase from 'react-lottie'
import styled from 'styled-components'

const Mini = styled.div`
	width: ${props => props.size || '50%'};
	align-self: flex-end;
	margin-left: -25%;
`

const Lottie = ({
	onEnd,
	animationData,
	extra,
	extraSize,
	loop,
	autoplay,
	width,
	height,
}) => {
	const defaultOptions = {
		loop: loop || false,
		autoplay: true,
		animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	}

	//const lottieEnd
	const eventListeners = [
		{
			eventName: 'complete',
			callback: onEnd || null,
		},
	]

	return (
		<div className="bg-tint-orange shape-circular display-flex">
			<LottieBase
				options={defaultOptions}
				isClickToPauseDisabled={true}
				eventListeners={eventListeners}
				width={width || '100%'}
				height={height || '100%'}
			/>
			{extra && (
				<Mini size={extraSize}>
					<LottieBase
						options={{ ...defaultOptions, animationData: extra }}
						isClickToPauseDisabled={true}
						eventListeners={eventListeners}
					/>
				</Mini>
			)}
		</div>
	)
}

export default Lottie
