'use strict';

// Major third-party modules
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';

// Reflux store
import EreborStore from '../store/EreborStore';

// Reflux actions
import EreborActions from '../action/EreborActions';

// Views

class ChestView extends Reflux.Component {
	constructor(props) {
		super(props);
		this.state = {
			stoneId: null
		}
	}

	updateView = (view) => {
		this.props.updateView(view);
	}

	stoneInfo = (id) => { this.setState({stoneId: id})}

	__renderStoneChest = () => {
		return <div className="chestView">
			<div className="stoneNFT"><img src="assets/elemmire/stone01.png" onClick={this.stoneInfo.bind(this, 1)}></img></div>
			<div className="stoneNFT"><img src="assets/elemmire/stone02.png" onClick={this.stoneInfo.bind(this, 2)}></img></div>
			<div className="stoneNFT"><img src="assets/elemmire/stone03.png" onClick={this.stoneInfo.bind(this, 3)}></img></div>
			<div className="stoneNFT"><img src="assets/elemmire/stone14.png" onClick={this.stoneInfo.bind(this, 14)}></img></div>
			<div className="stoneNFT"><img src="assets/elemmire/stone15.png" onClick={this.stoneInfo.bind(this, 15)}></img></div>
		</div>
	}

	__renderStoneTransfer = () => {
		return (
			this.state.stoneId === null ? <div>Welcome to Erebor</div>
				: <div>Showing Stone Info for stone {this.state.stoneId}</div>
		)
	}

	render() {
		//console.log("In MainView render()");
		return (
			<div className="chest">
					{this.__renderStoneChest()}
				<div className="stoneTransfer">
					{this.__renderStoneTransfer()}
				</div>
			</div>


		)

	}
}

export default ChestView;

