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

var _reactToastify = require('react-toastify');

var _EreborStore = require('../store/EreborStore');

var _EreborStore2 = _interopRequireDefault(_EreborStore);

var _EreborActions = require('../action/EreborActions');

var _EreborActions2 = _interopRequireDefault(_EreborActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Views

// Reflux store
class MiningView extends _reflux2.default.Component {
	constructor(props) {
		super(props);

		this.updateView = view => {
			this.props.updateView(view);
		};

		this.handleClickMining = () => {
			if (this.state.mining) {
				_EreborActions2.default.stopMining();
			} else {
				_EreborActions2.default.startMining();
			}
		};

		this.handleClickBuy = () => {
			_EreborActions2.default.buyMemberShip();
		};

		this.handleClickRenew = () => {
			_EreborActions2.default.renewMemberShip();
		};

		this.__renderMiningMessages = () => {
			return this.state.currentMiningMessages.map(message => {
				return _react2.default.createElement(
					'div',
					null,
					"> " + message
				);
			});
		};

		this.__renderMiningSettings = () => {
			return _react2.default.createElement(
				'div',
				null,
				this.__renderMiningRole(this.state.miningRole)
			);
		};

		this.__renderMiningRole = role => {
			return _react2.default.createElement(
				'div',
				{ className: 'gamerSetting' },
				_react2.default.createElement(
					'label',
					{ className: 'item TransferTo', style: { border: 'none' } },
					'Addr:',
					_react2.default.createElement('input', { size: 45, type: 'text', style: {
							backgroundColor: "rgba(255,255,255,0)",
							border: "1px solid white",
							color: "white",
							fontWeight: "bold",
							fontSize: "25px",
							fontFamily: "monospace",
							textAlign: "center"
						},
						value: this.state.address, placeholder: 'Ethereum Address' })
				),
				_react2.default.createElement(
					'div',
					{ className: 'item', style: { border: "none" } },
					_react2.default.createElement('input', { type: 'button', className: 'button gamestart',
						value: this.state.memberShipStatus === "not member" ? "buy" : this.state.memberShipStatus === "expired" ? "renew" : this.state.mining ? "stop" : "start",
						disabled: this.state.mining && !this.state.canQuit,
						onClick: this.state.memberShipStatus === "not member" ? this.handleClickBuy : this.state.memberShipStatus === "expired" ? this.handleClickRenew : this.handleClickMining })
				),
				_react2.default.createElement(
					'div',
					{ className: 'item', style: { border: "none", fontSize: "20px" } },
					"MemberShip Status: " + this.state.memberShipStatus
				)
			);
		};

		this.store = _EreborStore2.default;
		this.state = {
			miningRole: "Gamer"
		};
		this.storeKeys = ["mining", "currentMiningMessages", "canQuit", "address", "memberShipStatus"];
	}

	render() {
		//console.log("In MainView render()");
		return _react2.default.createElement(
			'div',
			{ className: 'mining' },
			_react2.default.createElement(
				'div',
				{ className: 'miningMessages' },
				this.__renderMiningMessages()
			),
			_react2.default.createElement(
				'div',
				{ className: 'miningSettings' },
				this.__renderMiningSettings()
			)
		);
	}
}

// Reflux actions
exports.default = MiningView;