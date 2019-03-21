import React from 'react'
import { InputBase } from '../styles/form'

const Input = ({
	type,
	label,
	value,
	placeholder,
	name,
	labelClass,
	inputClass,
	hasLabel,
	...props
}) => {
	return (
		<div class="mv-2">
			{hasLabel && (
				<label class={`input-label ${labelClass || ''}`} for={name}>
					{label}
				</label>
			)}
			<InputBase
				id={name}
				class={inputClass}
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				{...props}
			/>
		</div>
	)
}

export default Input
