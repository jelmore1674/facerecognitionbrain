import React from 'react';
import Tilt from 'react-parallax-tilt';
import './logo.css';
import thinking from './thinking.png';
const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt
				tiltMaxAngleX='55'
				tiltMaxAngleY='55'
				className='Tilt br2 shadow-2'
				style={{
					height: '150px',
					width: '150px',
				}}>
				<div className='pa3'>
					<img src={thinking} alt='logo' />
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;
