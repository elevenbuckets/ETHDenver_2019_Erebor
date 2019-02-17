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

class HeaderBarView extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = EreborStore;
	}

	updateView = (view) => {
		this.props.updateView(view);
	}

	passAccRef = () => {
		return ReactDOM.findDOMNode(this.refs.Accounts).firstChild;
	}

	render() {
		//console.log("In MainView render()");
		return (
            <div className="headerbar">
			
			<div className="miningTab" style={{color: this.props.currentView === 'Mining' ? '#ff4200' : 'white'}}
			   onClick={this.updateView.bind(this, 'Mining')}>Mining</div>
            		<div className="chestTab" style={{color: this.props.currentView === 'Chest' ? '#ff4200' : 'white'}} 
			   onClick={this.updateView.bind(this, 'Chest')}>Chest</div>
			</div>
			
			
		)

	}
}

export default HeaderBarView;

