import React from 'react'
import VerificationInput from 'react-verification-input'
import { CodeInputBase } from '../styles'

const CodeInput = ({ length = 6, onComplete, ...props }) => {
	const onChange = ({ target: { value } }) => {
		if (value.length >= length) {
			return onComplete(value)
		}
		return onComplete('')
	}
	const inputProps = {
		onChange,
	}
	return (
		<CodeInputBase>
			<VerificationInput
				autoFocus
				validChars="0-9"
				length={length}
				inputField={inputProps}
				removeDefaultStyles
				container={{
					className: 'container',
				}}
				characters={{
					className: 'bits',
				}}
				character={{
					className: 'bit shadow-4',
					classNameInactive: 'bit--inactive',
					classNameSelected: 'bit--selected',
				}}
				{...props}
			/>
		</CodeInputBase>
	)
}

export default CodeInput
