import styled from 'styled-components'
import { Base } from './CommonStyles'

export default styled(Base)`
	h4 {
		font-size: 2.5em;
		font-weight: 700;
		color: #9c3207;
	}
	.icon-logo {
		flex-direction: column;
		width: 50px;
		height: 50px;
		margin: 1em auto 2em auto;
		box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.1);
		background: ${props => (props.isPortrait ? 'white' : '#fef5e7')};
		a {
			width: 25px;
		}
	}
	.subline {
		font-size: 1.5em;
	}
	.card {
		border-radius: 20px;
	}
	.form-action {
		width: 55%;
	}
	@media (max-width: 991px), (orientation: portrait) {
		.card {
			box-shadow: 5px 20px 30px 0 rgba(0, 0, 0, 0.1);
		}
	}
	@media (min-width: 768px) {
		.icon-logo {
			width: 70px;
			height: 70px;
			a {
				width: 35px;
			}
		}
		.form-action {
			width: 50%;
		}
	}
`
