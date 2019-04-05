import React, { useEffect } from 'react'
import { useTransition, animated, config } from 'react-spring'
import Icon from 'react-eva-icons'

import styled from 'styled-components'

const AlertBase = styled(animated.div)`
	position: absolute;
	opacity: 0;
	bottom: -100px;
	z-index: 1;
`
const IconBase = styled.span`
	cursor: pointer;
`
const Alert = ({ text, color, onClose, autoClose = true, time = 8000 }) => {
	const display = useTransition(text, null, {
		from: { bottom: -100, opacity: 0 },
		enter: { bottom: 0, opacity: 1 },
		leave: { bottom: -100 },
		config: text ? config.wobbly : config.slow,
	})
	// Auto hide based on timer
	useEffect(() => {
		if (text && autoClose) {
			const timer = setTimeout(onHide, time)
			return () => {
				clearTimeout(timer)
			}
		}
	}, [text, autoClose])
	// Hide on Click
	const onHide = () => {
		onClose()
	}

	return display.map(
		({ item, props }) =>
			item && (
				<AlertBase
					className={`notification m-0 w-100 display-flex justify-content-space-between ${color ||
						'orange'} shape-no-radius`}
					style={props}
				>
					<p class="m-0">{text}</p>
					<IconBase onClick={onHide}>
						<Icon
							name="close-circle-outline"
							size="large"
							fill={color && color.search('filled') > -1 ? 'white' : 'black'}
						/>
					</IconBase>
				</AlertBase>
			)
	)
}

export default Alert
