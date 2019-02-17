'use strict';

// Major third-party modules
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';

// Reflux store
import EreborStore from '../store/EreborStore';

// Reflux actions
import EreborActions from '../action/EreborActions';
import { remote } from 'electron';

// Views

class ChestView extends Reflux.Component {
	constructor(props) {
		super(props);
		this.state = {
			stoneId: null
		}

		this.storeKeys = [ 'stoneCount' ];
		this.erebor = remote.getGlobal('erebor');

		this.updateChest();
	}

	updateView = (view) => {
		this.props.updateView(view);
	}

	stoneInfo = (id) => { this.setState({stoneId: id})}

	componentWillUpdate = (nextProp, nextState) => {
		if (nextState.stoneCount !== this.state.stoneCount) this.updateChest();
	}

	updateChest = () => {
		let inner = [];
		this.erebor.myTokens().then((p) => {
			p.map((s) => {
				//console.log(`DEBUG: s is ${s}`) ;
				let sti = this.erebor.getGemParams('0x' + s);
				inner.push(<div className="stoneNFT"><img src={`assets/elemmire/${sti.type}.png`} 
						onClick={this.stoneInfo.bind(this, sti.strength)}></img></div>);
			})
			this.setState({ inner });
		})
	}

	__renderStoneChest = () => {
		return <div className="chestView">
			{this.state.inner}
		</div>
	}

	__renderStoneTransfer = () => {
		return (
			this.state.stoneId === null ? <div>Welcome to Erebor</div>
				: <div>Showing Stone of strength {this.state.stoneId}</div>
		)
	}

	render() {
		console.log("In ChestView render()" + this.erebor.userWallet);
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

