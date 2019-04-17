import React from 'react'
import { AuthCardFormStyles as Base, TextLink } from '../styles'
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
						<TextLink
							className={`m-0 text-orange hover-grow${
								subaction.loading ? ' loading' : ''
							}`}
							onClick={subaction.act}
						>
							{subaction.text}
						</TextLink>
					)}
					<div class="form-action">
						<Button
							className="border-none rounded medium w-100"
							type="submit"
							disabled={disabled}
							loading={loading || action.loading}
						>
							{action.text}
						</Button>
					</div>
				</div>
				<div class="display-flex justify-content-center mt-4 footer">
					<TextLink
						className="display-flex align-items-middle justify-content-center normal text-hover-orange text-underline"
						onClick={back.act}
					>
						<span class="display-flex mr-1">
							<ArrowBack size={20} />
						</span>
						{back.text}
					</TextLink>
				</div>
			</form>
		</Base>
	)
}

export default AuthCardForm
