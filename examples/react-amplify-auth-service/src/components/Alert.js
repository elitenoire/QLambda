import React, { useEffect } from 'react'
import { useTransition, animated, config } from 'react-spring'
import { XCircle } from 'styled-icons/boxicons-regular/XCircle'

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
const Alert = ({
	text,
	color,
	dispatch,
	onClose,
	autoClose = true,
	time = 8000,
}) => {
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
		// Memoization works well with dispatch. onClose callback from Parent
		// should be wrapped with the useCallback hook so React.memo doesn't
		// consider it as a new prop
		// https://dev.to/changoman/react-optimizations-with-reactmemo-usecallback-and-usereducer-42ni
		if (typeof onClose === 'function') return onClose()
		if (typeof dispatch === 'function')
			return dispatch({ error: null, msg: null })
	}
	return display.map(
		({ item, key, props }) =>
			item && (
				<AlertBase
					className={`notification m-0 w-100 display-flex justify-content-space-between ${color ||
						'orange'} shape-no-radius`}
					style={props}
					key={key}
				>
					<p class="m-0">{text}</p>
					<IconBase onClick={onHide}>
						<XCircle
							size={20}
							color={color && color.search('filled') > -1 ? 'white' : 'black'}
						/>
					</IconBase>
				</AlertBase>
			)
	)
}
// Memoized version to prevent unnecessary renders
// Note: Memoization is not needed as Alert only renders to the DOM
// when ever there is an item/text. It only runs the function which will have
// a negligible cost.
export default React.memo(Alert)
