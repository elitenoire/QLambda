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
	error,
	hasLabel,
	...props
}) => {
	return (
		<div class="mv-2">
			{hasLabel && (
				<label
					class={`input-label${error ? ' text-red' : ''} ${labelClass || ''}`}
					for={name}
				>
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
			{error && (
				<p class="text-red thin italic" style={{ fontSize: '.8em' }}>
					{error}
				</p>
			)}
		</div>
	)
}

export default Input
