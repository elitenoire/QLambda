import React from 'react'
import { LoaderAlt } from 'styled-icons/boxicons-regular/LoaderAlt'
import { ButtonBase, Spinner } from '../styles'

const Button = ({ children, disabled = false, loading = false, ...props }) => {
	return (
		<ButtonBase disabled={disabled || loading} {...props}>
			{loading ? (
				<Spinner className="display-flex">
					<LoaderAlt size={20} />
				</Spinner>
			) : (
				children
			)}
		</ButtonBase>
	)
}

export default Button
