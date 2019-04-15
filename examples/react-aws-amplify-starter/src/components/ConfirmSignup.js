import React, { useState } from 'react'
import AuthCard from '../components/AuthCard'
import AuthCardForm from '../components/AuthCardForm'
import { CodeInput } from '../form'
import { useAuth, useForm } from '../hooks'
import { SIGNUP } from '../utils/constants'
//lotties
import bob from '../lotties/monster-bob.json'

const ConfirmSignup = () => {
	// Authentication
	const { user, error, msg, confirmSignUp, resendSignUp, dispatch } = useAuth()
	// Code to confirm user sign up
	const [code, setCode] = useState('')
	// Resending code status
	const [isResending, setIsResending] = useState(false)
	// Confirm user sign up
	const confirm = async e => await confirmSignUp(user.username, code)
	// Form attributes
	const { isSubmitting, handleSubmit } = useForm({}, confirm, false)
	// Resend code
	const resendCode = async e => {
		setIsResending(true)
		await resendSignUp(user.username)
		setIsResending(false)
	}
	// Retrieve code from user input
	const onComplete = value => {
		if (value !== code) {
			setCode(value)
		}
	}
	// Back to sign up
	const back = () => dispatch({ type: SIGNUP })

	return (
		<AuthCard animationData={bob} error={error} msg={msg} dispatch={dispatch}>
			<AuthCardForm
				disabled={!code}
				loading={isSubmitting}
				title="Confirm Account"
				subtitle="Please enter the code sent to your email below"
				action={{ text: 'Confirm', act: handleSubmit }}
				subaction={{
					text: 'Resend Code',
					act: resendCode,
					loading: isResending,
				}}
				back={{ text: 'Back to sign up', act: back }}
			>
				{user.username && (
					<div class="radio medium orange">
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
				)}
				<div class="pv-4">
					<CodeInput onComplete={onComplete} />
				</div>
			</AuthCardForm>
		</AuthCard>
	)
}

export default ConfirmSignup
