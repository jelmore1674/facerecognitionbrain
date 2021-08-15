import React from 'react';

class Rank extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emoji: '',
		};
	}

	componentDidMount() {
		this.generateEmoji(this.props.entries);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.entries === this.props.entries) {
			return null;
		}
		this.generateEmoji(this.props.entries);
	}

	generateEmoji = async (entries) => {
		const url = `https://bm8pydqj6b.execute-api.us-east-1.amazonaws.com/rank?rank=${entries}`;
		const resp = await fetch(url);
		const data = await resp.json();
		this.setState({ emoji: data.input });
	};

	render() {
		return (
			<div>
				<div className='white f3'>
					{`${this.props.name} ${this.state.emoji}, your current entry count is...`}
				</div>
				<div className='white f1'>{this.props.entries}</div>
			</div>
		);
	}
}

export default Rank;
