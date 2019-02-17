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

		this.stoneInfo = id => {
			this.setState({ stoneId: id });
		};

		this.__renderStoneChest = () => {
			return _react2.default.createElement(
				'div',
				{ className: 'chestView' },
				_react2.default.createElement(
					'div',
					{ className: 'stoneNFT' },
					_react2.default.createElement('img', { src: 'assets/elemmire/stone01.png', onClick: this.stoneInfo.bind(this, 1) })
				),
				_react2.default.createElement(
					'div',
					{ className: 'stoneNFT' },
					_react2.default.createElement('img', { src: 'assets/elemmire/stone02.png', onClick: this.stoneInfo.bind(this, 2) })
				),
				_react2.default.createElement(
					'div',
					{ className: 'stoneNFT' },
					_react2.default.createElement('img', { src: 'assets/elemmire/stone03.png', onClick: this.stoneInfo.bind(this, 3) })
				),
				_react2.default.createElement(
					'div',
					{ className: 'stoneNFT' },
					_react2.default.createElement('img', { src: 'assets/elemmire/stone14.png', onClick: this.stoneInfo.bind(this, 14) })
				),
				_react2.default.createElement(
					'div',
					{ className: 'stoneNFT' },
					_react2.default.createElement('img', { src: 'assets/elemmire/stone15.png', onClick: this.stoneInfo.bind(this, 15) })
				)
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
				'Showing Stone Info for stone ',
				this.state.stoneId
			);
		};

		this.state = {
			stoneId: null
		};
	}

	render() {
		//console.log("In MainView render()");
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

// Reflux actions
exports.default = ChestView;