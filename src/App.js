import React from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import Particles from 'react-tsparticles';
import FaceRecognition from './components/facerecognition/facerecognition';
import Clarifai from 'clarifai';
import SignIn from './components/signin/signin';
import Register from './components/register/resgister';

const app = new Clarifai.App({
	apiKey: 'f1866e97d6404d20826bfa5dac516bcc',
});
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
		};

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

	options = {
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
	};

	calculateFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	displayFaceBox = (box) => {
		this.setState({ box: box });
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		console.log('click');
		this.setState({ imageUrl: this.state.input });
		app.models
			.predict(
				Clarifai.FACE_DETECT_MODEL,
				// THE JPG
				this.state.input
			)
			.then((response) => {
				this.displayFaceBox(this.calculateFaceLocation(response));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({ isSignedIn: false });
		} else if (route === 'home') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
		return (
			<div className='App'>
				<Particles
					id='tsparticles'
					init={this.particlesInit}
					loaded={this.particlesLoaded}
					options={this.options}
				/>
				<Navigation
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
				/>
				{route === 'home' ? (
					<div>
						<Logo />
						<Rank />
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition imageUrl={imageUrl} box={box} />
					</div>
				) : this.state.route === 'signin' ? (
					<SignIn onRouteChange={this.onRouteChange} />
				) : (
					<Register onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;
