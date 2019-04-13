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
		${({ pulse, disabled }) => css`
			box-shadow: ${!disabled
				? pulse
					? 'none'
					: '5px 5px 8px 0 rgba(0, 0, 0, 0.1)'
				: '5px 20px 30px 0 rgba(0, 0, 0, 0.1)'};
			transform: ${disabled ? 'none' : 'scale(0.9)'};
			animation: none;
		`}
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
		:disabled {
			background: transparent;
			border-color: whitesmoke;
		}
	}
`
// CodeInput
export const CodeInputBase = styled.div`
	.container {
		max-width: 500px;
	}
	.bits {
		height: 5em;
	}
	.bit {
		font-size: 2.5em;
		line-height: 2;
		text-align: center;
		margin: 0 0.15em;
		cursor: default;
		user-select: none;
		border-radius: 10px;
		border: 1px solid #f4eee9;
		background: #f2f2f2;
		color: #5a5a5b;
		box-shadow: 0 14px 28px rgba(74, 73, 72, 0.25),
			0 10px 10px rgba(74, 73, 72, 0.22);
		transition: all 0.3s ease-out;
	}
	.bit--inactive {
		box-shadow: none;
	}
	.bit--selected {
		border: 1.5px solid #f9ae37;
	}
	@media (max-width: 991px), (orientation: portrait) {
		.bits {
			height: 4em;
		}
		.bit {
			font-size: 2em;
		}
	}
`
