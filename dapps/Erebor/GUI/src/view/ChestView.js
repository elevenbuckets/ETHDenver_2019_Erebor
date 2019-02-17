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

	stoneInfo = (id) => { 
		let data = JSON.stringify(id,0,2);
		this.setState({stoneId: data})
	}

	componentWillUpdate = (nextProp, nextState) => {
		if (nextState.stoneCount !== this.state.stoneCount) this.updateChest();
	}

	updateChest = () => {
		let inner = [];
		this.erebor.myTokens().then((p) => {
			p.map((s) => {
				let sti = this.erebor.getGemParams(s);
				inner.push(<div className="stoneNFT"><img src={`assets/elemmire/${sti.type}.png`} 
						onClick={this.stoneInfo.bind(this, {...sti, tokenId: '0x' + s})}></img></div>);
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
			this.state.stoneId === null ? <div>This is your trasure chest.</div>
				: <div>Stone Meta: <br/> {Object.keys(JSON.parse(this.state.stoneId)).map((k)=>{ return `${k}: ${JSON.parse(this.state.stoneId)[k]}<br/>`})}</div>
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

