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

var _EreborStore = require('../store/EreborStore');

var _EreborStore2 = _interopRequireDefault(_EreborStore);

var _EreborActions = require('../action/EreborActions');

var _EreborActions2 = _interopRequireDefault(_EreborActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Views

// Reflux store
class SideBarView extends _reflux2.default.Component {
	constructor(props) {
		super(props);

		this.updateView = view => {
			this.props.updateView(view);
		};

		this.passAccRef = () => {
			return _reactDom2.default.findDOMNode(this.refs.Accounts).firstChild;
		};

		this.store = _EreborStore2.default;
	}

	render() {
		//console.log("In MainView render()");
		return _react2.default.createElement(
			'div',
			{ className: 'sidebar' },
			_react2.default.createElement(
				'div',
				{ className: 'sideLogo' },
				_react2.default.createElement('img', { src: 'assets/icon/11be_logo.png', style: { width: '2.75vw' } }),
				_react2.default.createElement(
					'p',
					{ style: { color: "white", fontSize: "1.9vw", textAlign: "center", margin: "6px 0px 6px 0px" } },
					' ElevenBuckets '
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'sidebarButton', style: { color: this.props.currentView === 'AppLauncher' ? '#ff4200' : 'white' },
					onClick: this.updateView.bind(this, 'AppLauncher') },
				'Mining'
			),
			_react2.default.createElement(
				'div',
				{ className: 'sidebarButton', style: { color: this.props.currentView === 'TokenSettings' ? '#ff4200' : 'white' },
					onClick: this.updateView.bind(this, 'TokenSettings') },
				'Collections'
			),
			_react2.default.createElement(
				'div',
				{ className: 'sidebarButton', style: { color: this.props.currentView === 'Receipts' ? '#ff4200' : 'white' },
					onClick: this.updateView.bind(this, 'Receipts') },
				'Trade'
			)
		);
	}
}

// Reflux actions
exports.default = SideBarView;