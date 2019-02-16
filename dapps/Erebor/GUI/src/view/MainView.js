'use strict';

// Major third-party modules
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
const ipcRenderer = require('electron').ipcRenderer;
import path from 'path';

// Reflux store
import EreborStore from '../store/EreborStore';

// Reflux actions
import EreborActions from '../action/EreborActions';


// Views
import HeaderBarView from './HeaderBarView';
import MiningView from './MiningView';


class MainView extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = EreborStore;
		// this.controlPanel = remote.getGlobal("controlPanel");
		// this.controlPanel.client.subscribe('newJobs');
		// this.controlPanel.client.on('newJobs', this.handleNewJobs);
		// this.controlPanel.syncTokenInfo();
		this.state = {
			currentView: "AppLauncher"
		}

		this.storeKeys = [
			"unlocked",
			"currentView",
			"modalIsOpen",
			"scheduleModalIsOpen",
			"retrying",
			"rpcfailed",
			"configured",
			"userCfgDone",
			"syncInProgress",
			"blockHeight",
			"highestBlock"
		];

	}

	updateState = (key, view) => {
		this.setState({ [key]: view });
	}

	updateStateForEvent = (key, e) => {
        this.setState({ [key]: e.target.value });
    }

	passAccRef = () => {
		return ReactDOM.findDOMNode(this.refs.Accounts).firstChild;
	}




	render() {
		console.log("In MainView render(); syncInProgress = " + this.state.syncInProgress);

			return (
				<div className="wrapper">
					<HeaderBarView currentView={this.state.currentView} updateView={this.updateState.bind(this, "currentView")} />
					<div className="content">
						<MiningView/>
					</div>
				</div>
			)
		
	}
}

export default MainView;

