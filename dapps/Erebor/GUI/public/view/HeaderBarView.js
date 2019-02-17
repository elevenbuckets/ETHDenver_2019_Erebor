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
class HeaderBarView extends _reflux2.default.Component {
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
			{ className: 'headerbar' },
			_react2.default.createElement(
				'div',
				{ className: 'miningTab', style: { color: this.props.currentView === 'Mining' ? '#ff4200' : 'white' },
					onClick: this.updateView.bind(this, 'Mining') },
				'Mining'
			),
			_react2.default.createElement(
				'div',
				{ className: 'memberTab', style: { color: this.props.currentView === 'MemberShip' ? '#ff4200' : 'white' },
					onClick: this.updateView.bind(this, 'MemberShip') },
				'MemberShip'
			),
			_react2.default.createElement(
				'div',
				{ className: 'chestTab', style: { color: this.props.currentView === 'Chest' ? '#ff4200' : 'white' },
					onClick: this.updateView.bind(this, 'Chest') },
				'Chest'
			)
		);
	}
}

// Reflux actions
exports.default = HeaderBarView;