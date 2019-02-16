'use strict';

// Major third-party modules
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import { ToastContainer, toast } from 'react-toastify';

// Reflux store
import EreborStore from '../store/EreborStore';

// Reflux actions
import EreborActions from '../action/EreborActions';

// Views

class MiningView extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = EreborStore;
		this.state = {
			miningRole: "Gamer"
		}
		this.storeKeys = ["mining","currentMiningMessages"];
	}

	updateView = (view) => {
		this.props.updateView(view);
	}

	handleClickMining = () => {
		if (this.state.mining) {
			EreborActions.stopMining();
		} else {
			EreborActions.startMining();
		}
	}

	notify = () => toast(<div>Congratulation! Just mined a token successfully</div>);

	__renderMiningMessages = () => {
		return this.state.currentMiningMessages.map(message => {
			return <div>
				{"> " +  message}
			</div>
		})
	}

	__renderMiningSettings = () => {
		return <div>
			{this.__renderMiningRole(this.state.miningRole)}
		</div>;
	}

	__renderMiningRole = (role) => {
		return <div className="gamerSetting">
			<label className="item TransferTo" style={{ border: 'none' }}>
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
			<input type="button" className="button" style={{ margin: "40px 0 0 40px", fontSize: "22px" }}
				value={this.state.mining ? "stop" : "start"} onClick={this.handleClickMining} />
		</div>
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

