import React from 'react'
import { useTransition, animated, config } from 'react-spring'
import Icon from 'react-eva-icons'
import { Input, Button } from '../form'
import Alert from './Alert'
import { Layer, LoginSignupStyles as Sheet } from '../styles'
import { useForm, useAuth } from '../hooks'
import validate from '../utils/validate'
import logo from '../assets/logo.png'

// Initial form values
const loginInitialValues = { email: '', password: '' }
const signupInitialValues = { ...loginInitialValues, confirmPassword: '' }

const LoginSignup = ({ isPortrait }) => {
	// Authentication
	const { signIn, signUp, error, authState, dispatch } = useAuth()
	// Variable to toggle between signup and login
	const showSignUp = authState === 'signUp'
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
	// Form Controller
	const FormController = {
		signup: useForm(signupInitialValues, submitSignUp, validate),
		login: useForm(loginInitialValues, submitSignIn, validate),
	}
	// Current form attributes
	const {
		values,
		errors,
		resetForm,
		handleChange,
		handleSubmit,
		isSubmitting,
	} = showSignUp ? FormController.signup : FormController.login
	// Swap between SignIn and SignUp form
	const swapForm = _ => {
		resetForm()
		dispatch({ type: !showSignUp ? 'SIGNUP' : 'SIGNIN', error: null })
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
		config: config.wobbly,
	})
	// Only render this component for Signup / Signin
	if (!showSignUp && authState !== 'signIn') {
		return null
	}

	return (
		<Sheet isPortrait={isPortrait}>
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
								hasLabel
							/>
							{showSignUp && (
								<Input
									label="Confirm Password"
									name="confirmPassword"
									placeholder="confirm password"
									type="password"
									labelClass="bold"
									value={values.confirmPassword}
									onChange={handleChange}
									error={errors.confirmPassword}
									hasLabel
								/>
							)}
						</div>
						<div class="form-action">
							<Button
								className="border-none rounded medium w-100"
								type="submit"
								disabled={isSubmitting}
							>
								{isSubmitting && (
									<span class="display-flex">
										<Icon
											name="loader-outline"
											size="medium"
											animation={{
												type: 'pulse',
												infinite: true,
												hover: false,
											}}
										/>
									</span>
								)}
								{!isSubmitting
									? showSignUp
										? 'Create Account'
										: 'Sign In'
									: ''}
							</Button>
						</div>
					</form>
					<p class="display-flex justify-content-center">
						{showSignUp ? (
							<>
								Already have an account?
								<span class="text-link" onClick={swapForm}>
									Sign in
								</span>
							</>
						) : (
							<>
								No account yet?
								<span class="text-link" onClick={swapForm}>
									Sign up
								</span>
							</>
						)}
					</p>
				</animated.div>
			</Layer>
			<Alert
				color={isPortrait ? 'bg-black filled' : 'orange'}
				onClose={() => dispatch({ error: null })}
				text={error}
			/>
		</Sheet>
	)
}

export default LoginSignup
