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

var _electron = require('electron');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Views

// Reflux actions
class ChestView extends _reflux2.default.Component {
	constructor(props) {
		super(props);

		this.updateView = view => {
			this.props.updateView(view);
		};

		this.stoneInfo = id => {
			this.setState({ stoneId: id });
		};

		this.componentWillUpdate = (nextProp, nextState) => {
			if (nextState.stoneCount !== this.state.stoneCount) this.updateChest();
		};

		this.updateChest = () => {
			let inner = [];
			this.erebor.myTokens().then(p => {
				p.map(s => {
					//console.log(`DEBUG: s is ${s}`) ;
					let sti = this.erebor.getGemParams('0x' + s);
					inner.push(_react2.default.createElement(
						'div',
						{ className: 'stoneNFT' },
						_react2.default.createElement('img', { src: `assets/elemmire/${sti.type}.png`,
							onClick: this.stoneInfo.bind(this, sti.strength) })
					));
				});
				this.setState({ inner });
			});
		};

		this.__renderStoneChest = () => {
			return _react2.default.createElement(
				'div',
				{ className: 'chestView' },
				this.state.inner
			);
		};

		this.__renderStoneTransfer = () => {
			return this.state.stoneId === null ? _react2.default.createElement(
				'div',
				null,
				'Welcome to Erebor'
			) : _react2.default.createElement(
				'div',
				null,
				'Showing Stone of strength ',
				this.state.stoneId
			);
		};

		this.state = {
			stoneId: null
		};

		this.storeKeys = ['stoneCount'];
		this.erebor = _electron.remote.getGlobal('erebor');
	}

	render() {
		console.log("In ChestView render()" + this.erebor.userWallet);
		return _react2.default.createElement(
			'div',
			{ className: 'chest' },
			this.__renderStoneChest(),
			_react2.default.createElement(
				'div',
				{ className: 'stoneTransfer' },
				this.__renderStoneTransfer()
			)
		);
	}
}

// Reflux store
exports.default = ChestView;