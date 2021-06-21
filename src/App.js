import React from 'react';

import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import Particles from 'react-tsparticles';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.particlesInit = this.particlesInit.bind(this);
		this.particlesLoaded = this.particlesLoaded.bind(this);
	}

	particlesInit(main) {
		console.log(main);

		// you can initialize the tsParticles instance (main) here, adding custom shapes or presets
	}

	particlesLoaded(container) {
		console.log(container);
	}

	render() {
		return (
			<div className='App'>
				<Particles
					id='tsparticles'
					init={this.particlesInit}
					loaded={this.particlesLoaded}
					options={{
						background: {},
						fpsLimit: 60,
						interactivity: {
							detectsOn: 'canvas',
							events: {
								onClick: {
									enable: true,
									mode: 'push',
								},
								onHover: {
									enable: true,
									mode: 'repulse',
								},
								resize: true,
							},
							modes: {
								bubble: {
									distance: 400,
									duration: 4,
									opacity: 0.8,
									size: 40,
								},
								push: {
									quantity: 1,
								},
								repulse: {
									distance: 200,
									duration: 0.9,
								},
							},
						},
						particles: {
							color: {
								value: '#ffffff',
							},
							links: {
								color: '#ffffff',
								distance: 150,
								enable: true,
								opacity: 0.2,
								width: 1,
							},
							collisions: {
								enable: true,
							},
							move: {
								direction: 'none',
								enable: true,
								outMode: 'bounce',
								random: true,
								speed: 3,
								straight: false,
							},
							number: {
								density: {
									enable: true,
									value_area: 1200,
								},
								value: 200,
							},
							opacity: {
								value: 0.3,
							},
							shape: {
								type: 'triangle',
							},
							size: {
								random: true,
								value: 5,
							},
						},
						detectRetina: true,
					}}
				/>
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm />
				{/* {
    <FaceRecognition />} */}
			</div>
		);
	}
}

export default App;
