import styled from 'styled-components'
import { Base } from './CommonStyles'

export const ColoredBase = styled(Base)`
	border-radius: 0 50px 0 0;
	color: white;
	box-shadow: 0 0 25px 6px rgba(225, 191, 124, 0.6);
	background: linear-gradient(
		to bottom,
		#f7edac,
		#f6e59f,
		#f6de93,
		#f6d587,
		#f7cd7b,
		#f0bc6e,
		#e8ab62,
		#e09a58,
		#cc7d4b,
		#b66240,
		#9f4736,
		#862d2d
	);
	h3 {
		color: white;
		font-size: 1.1em;
	}
	p {
		line-height: 1.125em;
		font-weight: 300;
		font-size: 2em;
	}
	@media (max-width: 991px), (min-width: 992px) and (orientation: portrait) {
		background: radial-gradient(
			ellipse at center,
			rgba(242, 242, 189, 0.6) 0%,
			rgba(245, 231, 184, 1) 31%,
			rgba(252, 209, 174, 1) 100%
		);
		text-align: center;
		box-shadow: none;
		border-radius: 0;
		color: black;
		h3 {
			color: #9c3207;
			font-size: 1.4em;
		}
		.label-group {
			justify-content: center;
		}
	}
`

export const Image = styled.div`
	width: 65%;
	height: auto;
	margin: 0 auto;
	@media (max-width: 991px) {
		width: 50%;
	}
	@media (min-width: 767px) and (max-width: 991px) {
		width: 45%;
	}
`

export const Bottom = styled.div`
	position: absolute;
	bottom: -5px;
	width: 100%;
`

// box-shadow: 5px 20px 30px 0 rgba(0,0,0,0.1);

export const Pill = styled.span`
	&&& {
		background: rgba(255, 255, 255, 0.05);
		color: rgba(255, 255, 255, 0.3);
		border: none;
		:hover {
			background: rgba(255, 255, 255, 0.15);
		}
		@media (max-width: 991px), (min-width: 992px) and (orientation: portrait) {
			border: 0.5px solid #f9ae37;
			color: #f9ae37;
			:hover {
				box-shadow: 0 0 10px rgba(255, 120, 25, 0.7);
			}
		}
	}
`
