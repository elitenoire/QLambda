import React, { useState } from 'react'
import { useTransition, animated, config } from 'react-spring'
import Icon from 'react-eva-icons'
import { Input, Button } from '../form'
import { Layer, AuthenticationStyles as Sheet } from '../styles'
import useForm from '../hooks/useForm'
import validate from '../utils/validate'
import logo from '../assets/logo.png'

// Initial form values
const loginInitialValues = { email: '', password: '' }
const signupInitialValues = { ...loginInitialValues, confirmPassword: '' }

const Authentication = ({ isPortrait }) => {
	// Variable to toggle between signup and login
	const [signup, setSignup] = useState(false)
	// Signup Method
	const submitSignup = e => console.log('No errors, submit callback called', e)
	// Login Method
	const submitLogin = e => console.log('No errors, login callback called', e)
	// Form Controller
	const FormController = {
		signup: useForm(signupInitialValues, submitSignup, validate),
		login: useForm(loginInitialValues, submitLogin, validate),
	}
	// Current form attributes
	const {
		values,
		errors,
		resetForm,
		handleChange,
		handleSubmit,
		isSubmitting,
		setIsSubmitting,
	} = signup ? FormController.signup : FormController.login
	// Switch form
	const swapForm = _ => {
		resetForm()
		setSignup(!signup)
	}
	// Switch form animation
	const [fade] = useTransition(signup, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 1 },
		config: config.wobbly,
	})

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
						{signup ? "Let's create your account" : 'Sign in to your account'}
					</p>
					<form
						id={`form-${signup ? 'signup' : 'login'}`}
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
							{signup && (
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
								{!isSubmitting ? (signup ? 'Create Account' : 'Sign In') : ''}
							</Button>
						</div>
					</form>
					<p class="display-flex justify-content-center">
						{signup ? (
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
		</Sheet>
	)
}

export default Authentication
