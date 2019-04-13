import React from 'react'
import { AuthCardFormStyles as Base } from '../styles'
import { ArrowBack } from 'styled-icons/boxicons-regular/ArrowBack'
import { Button } from '../form'

const AuthCardForm = props => {
	const {
		title,
		subtitle,
		action = {},
		subaction = {},
		back = {},
		children,
		disabled,
		loading,
	} = props
	return (
		<Base>
			<div class="header">
				<h4>{title}</h4>
				<p class="mv-2">{subtitle}</p>
			</div>
			<form class="form-control" onSubmit={action.act}>
				{children}
				<div class="display-flex align-items-middle justify-content-space-around pv-2">
					{subaction.text && (
						<p
							class="m-0 text-orange bold hover-grow text-clickable"
							onClick={subaction.act}
						>
							{subaction.text}
						</p>
					)}
					<div class="form-action">
						<Button
							className="border-none rounded medium w-100"
							type="submit"
							disabled={disabled}
							loading={loading}
						>
							{action.text}
						</Button>
					</div>
				</div>
				<div class="display-flex justify-content-center mt-4 footer">
					<p
						class="display-flex align-items-middle justify-content-center text-hover-orange text-clickable"
						onClick={back.act}
					>
						<span class="display-flex mr-1">
							<ArrowBack size={20} />
						</span>
						{back.text}
					</p>
				</div>
			</form>
		</Base>
	)
}

export default AuthCardForm
