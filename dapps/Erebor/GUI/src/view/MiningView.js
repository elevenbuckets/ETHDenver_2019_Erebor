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

class MiningView extends Reflux.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMiningMessages: ["Currently mining, the expected mined time is 10 min,", "Keep going"],
			miningRole: "Gamer"
		}
	}

	updateView = (view) => {
		this.props.updateView(view);
	}
	__renderMiningMessages = () => {
		return this.state.currentMiningMessages.map(message => {
			return <div>
				{message}
			</div>
		})
	}

	__renderMiningSettings = () => {
		return <div>
			<div className="headerbarButton" style={{ color: this.props.currentView === 'AppLauncher' ? '#ff4200' : 'white' }}
				onClick={this.updateView.bind(this, 'AppLauncher')}>Gamer</div>
			<div className="headerbarButton" style={{ color: this.props.currentView === 'TokenSettings' ? '#ff4200' : 'white' }}
				onClick={this.updateView.bind(this, 'TokenSettings')}>Defender</div>
			<div className="headerbarButton" style={{ color: this.props.currentView === 'Receipts' ? '#ff4200' : 'white' }}
				onClick={this.updateView.bind(this, 'Receipts')}>Validator</div>
			{this.__renderMiningRole(this.state.miningRole)}
		</div>;
	}

	__renderMiningRole = (role) => {
		return role === "Gamer" ? <div className="gamerSetting">
			<label className="item TransferTo" style = {{border:'none'}}>
				Addr:
		<input size={30} type='text' style=
					{{
						backgroundColor: "rgba(255,255,255,0)",
						border: "1px solid white",
						color: "white",
						fontWeight: "bold",
						fontSize: "24px",
						fontFamily: "monospace",
						textAlign: "center"
					}} 
					value={this.state.recipient} placeholder="Ethereum Address" />

			</label>
			<input type="button" className="button" style={{margin: "40px 0 0 40px", fontSize: "22px"}} value="start" onClick={this.handleSend} />
		</div> : <div></div>
	}

	render() {
		//console.log("In MainView render()");
		return (
			<div className="mining">
				<div className="miningMessages">
					{this.__renderMiningMessages()}
				</div>
				<div className="miningSettings">
					{this.__renderMiningSettings()}
				</div>
			</div>


		)

	}
}

export default MiningView;

