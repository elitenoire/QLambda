import React, { useState } from 'react'
import { Input, Button } from '../form'
import { Layer, AuthenticationStyles as Sheet } from '../styles'
import logo from '../assets/logo.png'

const Authentication = ({ isPortrait }) => {
	const [signup, setSignup] = useState(false)

	return (
		<Sheet isPortrait={isPortrait}>
			<Layer>
				<div class="hover-bob shadow-1 shape-circular display-flex justify-content-center align-items-middle icon-logo">
					<a href="#">
						<img class="img-responsive" src={logo} alt="Logo" />
					</a>
				</div>
				<h4>Hello!</h4>
				<p class="subline">
					{signup ? "Let's create your account" : 'Sign in to your account'}
				</p>
				<div class="card pt-1 pb-2 pl-3 pr-3 border-none soft-shadow-1">
					<form
						class="form-control"
						action="#"
						method="post"
						id={`form-${signup ? 'signup' : 'login'}`}
					>
						<Input
							label="Email"
							name="email"
							placeholder="email@example.com"
							type="email"
							labelClass="bold"
							hasLabel
						/>
						<Input
							label="Password"
							name="password"
							placeholder="password"
							type="password"
							labelClass="bold"
							hasLabel
						/>
						{signup && (
							<Input
								label="Confirm Password"
								name="confirm-password"
								placeholder="confirm password"
								type="password"
								labelClass="bold"
								hasLabel
							/>
						)}
					</form>
				</div>
				<div class="form-action">
					<Button className="border-none rounded medium w-100">
						{signup ? 'Create Account' : 'Sign In'}
					</Button>
				</div>
				<p class="display-flex justify-content-center">
					{signup ? (
						<>
							Already have an account?
							<span class="text-link" onClick={() => setSignup(false)}>
								Sign in
							</span>
						</>
					) : (
						<>
							No account yet?
							<span class="text-link" onClick={() => setSignup(true)}>
								Sign up
							</span>
						</>
					)}
				</p>
			</Layer>
		</Sheet>
	)
}

export default Authentication
