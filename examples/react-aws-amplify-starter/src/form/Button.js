import React from 'react'
import { LoaderAlt } from 'styled-icons/boxicons-regular/LoaderAlt'
import { ButtonBase } from '../styles'

const Button = ({ children, disabled = false, loading = false, ...props }) => {
	return (
		<ButtonBase disabled={disabled || loading} {...props}>
			{loading ? (
				<span class="display-flex">
					<LoaderAlt size={20} />
				</span>
			) : (
				children
			)}
		</ButtonBase>
	)
}

export default Button
