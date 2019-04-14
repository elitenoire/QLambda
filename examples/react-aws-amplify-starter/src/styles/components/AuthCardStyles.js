import styled from 'styled-components'

export const Card = styled.div`
	margin: 0 auto;
	width: 90%;
	box-shadow: 5px 20px 30px 0 rgba(0, 0, 0, 0.1);
	border-radius: 80px;
	@media (max-width: 767px) {
		width: 100%;
		border-radius: 40px;
		box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
	}
`
export const Anime = styled.div`
	margin: 0 auto;
	width: ${prop => prop.size || '50%'};
	@media (max-width: 991px) {
		width: 25%;
	}
	@media (max-width: 767px), (min-width: 992px) and (orientation: portrait) {
		width: 30%;
	}
`
