import styled from 'styled-components'

export const Base = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100vh;
`
export const Layer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 85%;
	z-index: 1;
	font-size: 13px;
	@media (max-width: 767px) {
		width: 90%;
	}
	@media (min-width: 768px) and (max-width: 991px) and (orientation: portrait) {
		font-size: 20px;
	}
	@media (min-width: 992px) and (orientation: portrait) {
		font-size: 25px;
		width: 75%;
	}
`
export const Background = styled.div`
	background: whitesmoke;
`
