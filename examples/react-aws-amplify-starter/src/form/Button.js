import React from 'react'
import { ButtonBase } from '../styles'

const Button = ({ children, ...props }) => {
	return <ButtonBase {...props}>{children}</ButtonBase>
}

export default Button
