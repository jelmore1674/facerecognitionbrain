import React from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import Particles from 'react-tsparticles';
import FaceRecognition from './components/facerecognition/facerecognition';
import Modal from './components/Modal/modal';
import SignIn from './components/signin/signin';
import Register from './components/register/resgister';
import Profile from './components/Profile/Profile';

const initialState = {
	input: '',
	imageUrl: '',
	boxes: [],
	route: 'signin',
	isSignedIn: false,
	isProfileOpen: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: '',
		pet: '',
		age: '',
	},
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;

		this.particlesInit = this.particlesInit.bind(this);
		this.particlesLoaded = this.particlesLoaded.bind(this);
	}

	componentDidMount() {
		const token = window.sessionStorage.getItem('token');
		if (token) {
			fetch('http://localhost:3000/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			})
				.then((resp) => resp.json())
				.then((data) => {
					if (data && data.id) {
						fetch(`http://localhost:3000/profile/${data.id}`, {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								Authorization: token,
							},
						})
							.then((resp) => resp.json())
							.then((user) => {
								console.log(user);
								if (user && user.email) {
									this.loadUser(user);
									this.onRouteChange('home');
								}
							});
					}
				})
				.catch((err) => {
					console.log('error');
				});
		}
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined,
				pet: data.pet,
				age: data.age,
			},
		});
	};

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
		if (data && data.outputs) {
			const image = document.getElementById('inputimage');
			const width = Number(image.width);
			const height = Number(image.height);
			return data.outputs[0].data.regions.map((face) => {
				const clarifaiFace = face.region_info.bounding_box;
				return {
					leftCol: clarifaiFace.left_col * width,
					topRow: clarifaiFace.top_row * height,
					rightCol: width - clarifaiFace.right_col * width,
					bottomRow: height - clarifaiFace.bottom_row * height,
				};
			});
		}
		return;
	};

	displayFaceBox = (boxes) => {
		if (boxes) {
			this.setState({ boxes: boxes });
		}
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		fetch('http://localhost:3000/imageurl', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.sessionStorage.getItem('token'),
			},
			body: JSON.stringify({
				input: this.state.input,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response) {
					fetch('http://localhost:3000/image', {
						method: 'put',
						headers: {
							'Content-Type': 'application/json',
							Authorization:
								window.sessionStorage.getItem('token'),
						},
						body: JSON.stringify({
							id: this.state.user.id,
						}),
					})
						.then((response) => response.json())
						.then((count) => {
							this.setState(
								Object.assign(this.state.user, {
									entries: count,
								})
							);
						});
				}
				this.displayFaceBox(this.calculateFaceLocation(response));
			})
			.catch((err) => {
				console.log('Failed to find face, error with image', err);
			});
	};

	onRouteChange = (route) => {
		if (route === 'signout') {
			window.sessionStorage.removeItem('token');
			return this.setState(initialState);
		} else if (route === 'home') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	toggleModal = () => {
		this.setState((prevState) => ({
			...prevState,
			isProfileOpen: !prevState.isProfileOpen,
		}));
	};

	render() {
		const { isSignedIn, imageUrl, route, boxes, isProfileOpen, user } =
			this.state;
		return (
			<div className='App'>
				<Particles
					id='tsparticles'
					init={this.particlesInit}
					loaded={this.particlesLoaded}
					options={this.options}
				/>{' '}
				<Navigation
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
					toggleModal={this.toggleModal}
				/>{' '}
				{isProfileOpen && (
					<Modal>
						<Profile
							user={user}
							loadUser={this.loadUser}
							isProfileOpen={isProfileOpen}
							toggleModal={this.toggleModal}
						/>
					</Modal>
				)}
				{route === 'home' ? (
					<div>
						<Logo />
						<Rank
							name={this.state.user.name}
							entries={this.state.user.entries}
						/>{' '}
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>{' '}
						<FaceRecognition boxes={boxes} imageUrl={imageUrl} />{' '}
					</div>
				) : route === 'signin' ? (
					<SignIn
						loadUser={this.loadUser}
						onRouteChange={this.onRouteChange}
					/>
				) : (
					<Register
						loadUser={this.loadUser}
						onRouteChange={this.onRouteChange}
					/>
				)}{' '}
			</div>
		);
	}
}

export default App;
