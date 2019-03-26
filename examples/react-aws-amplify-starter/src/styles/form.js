import styled, { keyframes, css } from 'styled-components'

// Button
const pulse = keyframes`
{
    0% { box-shadow: 0 0 15px rgba(252,195,88, 0.7), 0 0 25px rgba(252,195,88, 0.7); }
    50% { box-shadow: 0 0 0 10px rgba(252,195,88, 0.3), 0 0 0 15px rgba(252,195,88, 0.3); }
    100% { box-shadow: 0 0 0 15px rgba(252,195,88, 0.2), 0 0 0 35px rgba(252,195,88, 0.2); }
}
`

export const ButtonBase = styled.button`
	background: linear-gradient(270deg, #f46b45, #fcc358);
	box-shadow: 5px 20px 30px 0 rgba(0, 0, 0, 0.1);
	transition: 0.5s;
	transform: scale(1);
	backface-visibility: hidden;
	${props =>
		props.pulse &&
		css`
			animation: ${pulse} 0.7s linear infinite both;
			box-shadow: 0 0 15px rgba(252, 195, 88, 0.7),
				0 0 25px rgba(252, 195, 88, 0.7);
		`}
	:hover,
    :active {
		transform: ${props => (props.disabled ? 'none' : 'scale(0.9)')};
		animation: none;
	}
`

// Input
export const InputBase = styled.input`
	&&& {
		border-radius: 10px;
		border: 1px solid #efefef;
		background: #f2f2f2;
		transition: border 0.5s ease-out;
		::placeholder {
			color: #5a5a5b;
		}
		:focus {
			outline: none;
			border: 1.5px solid #f9ae37;
			border-radius: 10px;
		}
	}
`