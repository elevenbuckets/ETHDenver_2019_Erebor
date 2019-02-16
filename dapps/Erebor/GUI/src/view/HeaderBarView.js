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
			
			<div className="headerbarButton" style={{color: this.props.currentView === 'AppLauncher' ? '#ff4200' : 'white'}}
			   onClick={this.updateView.bind(this, 'AppLauncher')}>Mining</div>
			<div className="headerbarButton" style={{color: this.props.currentView === 'TokenSettings' ? '#ff4200' : 'white'}}
			   onClick={this.updateView.bind(this, 'TokenSettings')}>MemberShip</div>
            		<div className="headerbarButton" style={{color: this.props.currentView === 'Receipts' ? '#ff4200' : 'white'}} 
			   onClick={this.updateView.bind(this, 'Receipts')}>Box</div>

			   <div className="headerLogo" style={{width: '6vh',float: 'left'}}>
				<img src="assets/icon/erebor.png" style={{width: '6vh',float: 'left'}} />
			</div>
			</div>
			
			
		)

	}
}

export default HeaderBarView;

