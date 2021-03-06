import React from 'react'
import { useTransition, animated, config } from 'react-spring'
import { Input, Button } from '../form'
import Alert from './Alert'
import { Layer, LoginSignupStyles as Sheet, TextLink } from '../styles'
import { useForm, useAuth } from '../hooks'
import { SIGNUP, SIGNIN, FORGOT_PASSWORD } from '../utils/constants'

import logo from '../assets/logo.png'

// Initial form values
const signinInitialValues = { email: '', password: '' }
const signupInitialValues = { ...signinInitialValues, confirmPassword: '' }

const LoginSignup = ({ isPortrait }) => {
	// Authentication
	const { user, signIn, signUp, error, msg, authState, dispatch } = useAuth()
	// Variable to toggle between signup and login
	const showSignUp = authState === SIGNUP
	// SignIn Method
	const submitSignIn = async e =>
		await signIn(values.email.toLowerCase(), values.password)
	// SignUp Method
	const submitSignUp = async e =>
		await signUp({
			username: values.email.toLowerCase(),
			password: values.password,
			attributes: {
				email: values.email.toLowerCase(),
			},
		})
	// Remember user's username for sign in
	signinInitialValues.email = user.username || ''
	// Form Control
	const formParams = showSignUp
		? [signupInitialValues, submitSignUp]
		: [signinInitialValues, submitSignIn]
	const {
		values,
		errors,
		resetForm,
		handleChange,
		handleSubmit,
		isSubmitting,
	} = useForm(...formParams)
	// Swap between SignIn and SignUp form
	const swapForm = _ => {
		resetForm()
		dispatch({ type: showSignUp ? SIGNIN : SIGNUP })
	}
	// Switch form animation
	const [fade] = useTransition(showSignUp, null, {
		from: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
		leave: {
			opacity: 1,
		},
		config: config.slow,
	})

	return (
		<Sheet
			isPortrait={isPortrait}
			className={isPortrait ? 'bg-tint-orange' : ''}
		>
			<Layer>
				<div class="hover-bob shadow-1 shape-circular display-flex justify-content-center align-items-middle icon-logo">
					<a href="#">
						<img class="img-responsive" src={logo} alt="Logo" />
					</a>
				</div>
				<animated.div style={fade.props}>
					<h4>Hello!</h4>
					<p class="subline">
						{showSignUp
							? "Let's create your account"
							: 'Sign in to your account'}
					</p>
					<form
						id={`form-${showSignUp ? 'signup' : 'login'}`}
						class="form-control"
						onSubmit={handleSubmit}
						noValidate
					>
						<div class="card pt-1 pb-2 pl-3 pr-3 border-none soft-shadow-1">
							<Input
								label="Email"
								name="email"
								placeholder="email@example.com"
								type="email"
								labelClass="bold"
								value={values.email}
								onChange={handleChange}
								error={errors.email}
								hasLabel
							/>
							<Input
								label="Password"
								name="password"
								placeholder="password"
								type="password"
								labelClass="bold"
								value={values.password}
								onChange={handleChange}
								error={errors.password}
								autoFocus={!!user.username}
								hasLabel
							/>
							{showSignUp && (
								<Input
									label="Confirm Password"
									name="confirmPassword"
									placeholder="confirm password"
									type="password"
									labelClass="bold"
									value={values.confirmPassword || ''}
									onChange={handleChange}
									error={errors.confirmPassword || ''}
									hasLabel
								/>
							)}
						</div>
						<div class="display-flex align-items-middle justify-content-space-around pv-2">
							{!showSignUp && (
								<TextLink
									className=" m-0 hover-grow text-orange"
									onClick={_ => dispatch({ type: FORGOT_PASSWORD })}
								>
									Forgot Password?
								</TextLink>
							)}
							<div class="form-action">
								<Button
									className="border-none rounded medium w-100"
									type="submit"
									loading={isSubmitting}
								>
									{showSignUp ? 'Create Account' : 'Sign In'}
								</Button>
							</div>
						</div>
					</form>
					<p class="display-flex justify-content-center mt-2">
						{showSignUp ? (
							<>
								Already have an account?
								<TextLink as="span" className="text-orange" onClick={swapForm}>
									Sign in
								</TextLink>
							</>
						) : (
							<>
								No account yet?
								<TextLink as="span" className="text-orange" onClick={swapForm}>
									Sign up
								</TextLink>
							</>
						)}
					</p>
				</animated.div>
			</Layer>
			<Alert
				color={
					isPortrait
						? msg
							? 'green filled'
							: 'bg-black filled'
						: msg
						? 'green'
						: 'orange'
				}
				text={error || msg}
				dispatch={dispatch}
			/>
		</Sheet>
	)
}

export default LoginSignup
