import React from 'react'
import { ReactComponent as RobotSvg } from '../assets/robot.svg'
import { ReactComponent as BannerSvg } from '../assets/banner.svg'
import Button from '../form/Button'
import { AppProfileStyles, Layer } from '../styles'

const { ColoredBase, Pill, Bottom, Image } = AppProfileStyles

const AppProfile = ({ isPortrait, setShowAuth }) => {
	return (
		<ColoredBase>
			<Layer>
				<Image>
					<RobotSvg width="100%" height="100%" />
				</Image>
				<div class="pt-4 pr-3 pb-2 pl-3">
					<h3 class="subheader bold uppercase">React Amplify Auth</h3>
					<p class="content">A custom authentication flow using AWS Amplify</p>
					<div class="label-group">
						<Pill className="label rounded medium mb-2">AWS</Pill>
						<Pill className="label rounded medium mb-2">Amplify</Pill>
						<Pill className="label rounded medium mb-2">Cognito</Pill>
					</div>
				</div>
				<Button
					className={`medium rounded border-none mt-1 ${
						!isPortrait ? 'hide' : null
					}`}
					onClick={setShowAuth}
					pulse
				>
					Start
				</Button>
			</Layer>
			<Bottom className={!isPortrait ? 'hide' : null}>
				<BannerSvg width="100%" />
			</Bottom>
		</ColoredBase>
	)
}

export default AppProfile
