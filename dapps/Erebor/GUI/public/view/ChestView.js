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
class ChestView extends _reflux2.default.Component {
	constructor(props) {
		super(props);

		this.updateView = view => {
			this.props.updateView(view);
		};

		this.__renderStoneChest = () => {
			return this.state.currentMiningMessages.map(message => {
				return _react2.default.createElement(
					'div',
					null,
					message
				);
			});
		};

		this.__renderStoneTransfer = () => {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'headerbarButton', style: { color: this.props.currentView === 'AppLauncher' ? '#ff4200' : 'white' },
						onClick: this.updateView.bind(this, 'AppLauncher') },
					'Gamer'
				),
				_react2.default.createElement(
					'div',
					{ className: 'headerbarButton', style: { color: this.props.currentView === 'TokenSettings' ? '#ff4200' : 'white' },
						onClick: this.updateView.bind(this, 'TokenSettings') },
					'Defender'
				),
				_react2.default.createElement(
					'div',
					{ className: 'headerbarButton', style: { color: this.props.currentView === 'Receipts' ? '#ff4200' : 'white' },
						onClick: this.updateView.bind(this, 'Receipts') },
					'Validator'
				),
				this.__renderMiningRole(this.state.miningRole)
			);
		};

		this.__renderMiningRole = role => {
			return role === "Gamer" ? _react2.default.createElement(
				'div',
				{ className: 'gamerSetting' },
				_react2.default.createElement(
					'label',
					{ className: 'item TransferTo', style: { border: 'none' } },
					'Addr:',
					_react2.default.createElement('input', { size: 30, type: 'text', style: {
							backgroundColor: "rgba(255,255,255,0)",
							border: "1px solid white",
							color: "white",
							fontWeight: "bold",
							fontSize: "24px",
							fontFamily: "monospace",
							textAlign: "center"
						},
						value: this.state.recipient, placeholder: 'Ethereum Address' })
				),
				_react2.default.createElement('input', { type: 'button', className: 'button', style: { margin: "40px 0 0 40px", fontSize: "22px" }, value: 'start', onClick: this.handleSend })
			) : _react2.default.createElement('div', null);
		};

		this.state = {
			currentMiningMessages: ["Currently mining, the expected mined time is 10 min,", "Keep going"],
			miningRole: "Gamer"
		};
	}

	render() {
		//console.log("In MainView render()");
		return _react2.default.createElement(
			'div',
			{ className: 'chest' },
			_react2.default.createElement(
				'div',
				{ className: 'chestView' },
				this.__renderStoneChest()
			),
			_react2.default.createElement(
				'div',
				{ className: 'stoneTransfer' },
				this.__renderStoneTransfer()
			)
		);
	}
}

// Reflux actions
exports.default = ChestView;