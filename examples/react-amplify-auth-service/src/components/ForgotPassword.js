import React from 'react'
import AuthCard from './AuthCard'
import AuthCardForm from './AuthCardForm'
import { Input } from '../form'
import { useAuth, useForm } from '../hooks'
import { SIGNIN } from '../utils/constants'

//lotties
import bot from '../lotties/bot-butler.json'
import email from '../lotties/email.json'

// Initial form values
const initialValues = { email: '' }

const ForgotPassword = () => {
	// Authentication
	const { error, forgotPassword, dispatch } = useAuth()
	// Forgot password : send code to reset
	const forgotPwd = async e => await forgotPassword(values.email.toLowerCase())
	// Form attributes
	const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm(
		initialValues,
		forgotPwd
	)
	// Back to sign in
	const back = _ => dispatch({ type: SIGNIN })

	return (
		<AuthCard
			animationData={bot}
			extraData={email}
			extraSize="30%"
			error={error}
			dispatch={dispatch}
		>
			<AuthCardForm
				loading={isSubmitting}
				title="Forgot Password?"
				subtitle="Provide your email address below and we'll send you a code to reset your password"
				action={{
					text: 'Send Code',
					act: handleSubmit,
				}}
				back={{ text: 'Back to Sign In', act: back }}
			>
				<Input
					label="Email Address"
					id="email-reset"
					name="email"
					placeholder="example@mail.com"
					type="email"
					labelClass="bold"
					inputClass="medium"
					value={values.email}
					onChange={handleChange}
					error={errors.email}
					hasLabel
				/>
			</AuthCardForm>
		</AuthCard>
	)
}

export default ForgotPassword
