'use strict';

// Major third-party modules

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _EreborStore = require('../store/EreborStore');

var _EreborStore2 = _interopRequireDefault(_EreborStore);

var _EreborActions = require('../action/EreborActions');

var _EreborActions2 = _interopRequireDefault(_EreborActions);

var _HeaderBarView = require('./HeaderBarView');

var _HeaderBarView2 = _interopRequireDefault(_HeaderBarView);

var _MiningView = require('./MiningView');

var _MiningView2 = _interopRequireDefault(_MiningView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ipcRenderer = require('electron').ipcRenderer;

// Reflux store


// Reflux actions


// Views


class MainView extends _reflux2.default.Component {
	constructor(props) {
		super(props);

		this.updateState = (key, view) => {
			this.setState({ [key]: view });
		};

		this.updateStateForEvent = (key, e) => {
			this.setState({ [key]: e.target.value });
		};

		this.passAccRef = () => {
			return _reactDom2.default.findDOMNode(this.refs.Accounts).firstChild;
		};

		this.store = _EreborStore2.default;
		// this.controlPanel = remote.getGlobal("controlPanel");
		// this.controlPanel.client.subscribe('newJobs');
		// this.controlPanel.client.on('newJobs', this.handleNewJobs);
		// this.controlPanel.syncTokenInfo();
		this.state = {
			currentView: "AppLauncher"
		};

		this.storeKeys = ["unlocked", "currentView", "modalIsOpen", "scheduleModalIsOpen", "retrying", "rpcfailed", "configured", "userCfgDone", "syncInProgress", "blockHeight", "highestBlock"];
	}

	render() {
		console.log("In MainView render(); syncInProgress = " + this.state.syncInProgress);

		return _react2.default.createElement(
			'div',
			{ className: 'wrapper' },
			_react2.default.createElement(_HeaderBarView2.default, { currentView: this.state.currentView, updateView: this.updateState.bind(this, "currentView") }),
			_react2.default.createElement(
				'div',
				{ className: 'content' },
				_react2.default.createElement(_MiningView2.default, null)
			)
		);
	}
}

exports.default = MainView;