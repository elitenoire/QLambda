import React, { useState } from 'react'
import AuthCard from './AuthCard'
import AuthCardForm from './AuthCardForm'
import { CodeInput, Input } from '../form'
import { useAuth, useForm } from '../hooks'
import { SIGNIN } from '../utils/constants'

//lotties
import bot from '../lotties/bot-butler.json'
import lock from '../lotties/turn-lock.json'

// Initial form values
const initialValues = { password: '' }

const ResetPassword = () => {
	// Authentication
	const {
		user,
		error,
		msg,
		dispatch,
		resetPassword,
		forgotPassword,
	} = useAuth()
	// Code to reset password
	const [code, setCode] = useState('')
	// Resending code status
	const [isResending, setIsResending] = useState(false)
	// Reset password
	const resetPwd = async e =>
		await resetPassword(user.username, code, values.password)
	// Resend code to reset password
	const resendCode = async e => {
		setIsResending(true)
		await forgotPassword(user.username, true)
		setIsResending(false)
	}
	// Form attributes
	const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
		initialValues,
		resetPwd
	)
	// Retrieve code from user input
	const onComplete = value => {
		if (value !== code) {
			setCode(value)
		}
	}
	// Back to sign in
	const back = () => dispatch({ type: SIGNIN })

	return (
		<AuthCard
			animationData={bot}
			animationSize={'60%'}
			extraData={lock}
			error={error}
			msg={msg}
			dispatch={dispatch}
		>
			<AuthCardForm
				disabled={!code || !values.password}
				loading={isSubmitting}
				title="Reset Password"
				subtitle="Please enter the code sent to your email below and the new password"
				action={{ text: 'Reset', act: handleSubmit }}
				subaction={{
					text: 'Resend Code',
					act: resendCode,
					loading: isResending,
				}}
				back={{ text: 'Back to Sign In', act: back }}
			>
				<div class="radio small orange">
					<input
						type="radio"
						id="radio-username"
						name="username"
						class="radio-input"
						checked
						readOnly
					/>
					<label for="radio-username" class="radio-label bold">
						{user.username}
					</label>
				</div>
				<div class="pv-2">
					<CodeInput onComplete={onComplete} />
				</div>
				<Input
					label="New Password"
					name="password"
					placeholder="New password"
					type="password"
					labelClass={code ? 'bold' : 'thin'}
					value={values.password}
					onChange={handleChange}
					error={errors.password}
					hasLabel
					disabled={!code}
				/>
			</AuthCardForm>
		</AuthCard>
	)
}

export default ResetPassword
