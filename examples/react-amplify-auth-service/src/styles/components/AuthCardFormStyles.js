import styled from 'styled-components'

export default styled.div`
	margin: 2em 4em;
	h4 {
		font-size: 3em;
		font-weight: 700;
		color: #9c3207;
	}
	p {
		font-size: 1.25em;
		color: #5a5a5b;
	}
	.form-action {
		width: 50%;
	}
	@media (min-width: 768px) and (max-width: 991px), (orientation: portrait) {
		margin: 2em 3em;
		h4 {
			font-size: 2.5em;
		}
		p {
			font-size: 1.15em;
		}
	}
	@media (max-width: 767px) {
		margin: 1.5em;
		padding-top: 0.5em;
		h4 {
			font-size: 2em;
		}
		p {
			font-size: 1em;
		}
		.form-action {
			width: 55%;
		}
		.header {
			text-align: center;
		}
		.footer {
			margin-top: 0.5em !important;
		}
	}
`
