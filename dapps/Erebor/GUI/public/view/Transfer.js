"use strict";

// Third-parties

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDropdown = require('react-dropdown');

var _reactDropdown2 = _interopRequireDefault(_reactDropdown);

var _electron = require('electron');

var _WalletStates = require('../store/WalletStates');

var _WalletStates2 = _interopRequireDefault(_WalletStates);

var _WalletActions = require('../action/WalletActions');

var _WalletActions2 = _interopRequireDefault(_WalletActions);

var _TxObjects = require('./TxObjects');

var _TxObjects2 = _interopRequireDefault(_TxObjects);

var _Utils = require('../util/Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Views


// Reflux store
class Transfer extends _reflux2.default.Component {
  constructor(props) {
    super(props);

    this.handleSend = (addr, type, amount, gasNumber) => {
      _WalletActions2.default.send(this.state.address, addr, type, amount, gasNumber);
    };

    this.handleChange = event => {
      let addr = event.target.value;

      try {
        if (this.wallet.isAddress(addr) === true && (this.wallet.toAddress(addr) == addr || this.wallet.toChecksumAddress(addr) == addr)) {
          console.log('got addr: ' + addr);
          addr = this.wallet.toAddress(addr);
          (0, _Utils.createCanvasWithAddress)(this.refs.canvas, addr);
        } else {
          this.refs.canvas.getContext('2d').clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
        }
      } catch (err) {
        this.refs.canvas.getContext('2d').clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
      }

      this.setState({ recipient: addr });
    };

    this.render = () => {
      return _react2.default.createElement(
        'div',
        { className: 'item TransferLayout' },
        _react2.default.createElement(
          'label',
          { className: 'item TransferTo' },
          'Recipient:',
          _react2.default.createElement('input', { size: 52, type: 'text', style: {
              backgroundColor: "rgba(255,255,255,0)",
              border: "1px solid white",
              color: "white",
              fontWeight: "bold",
              fontSize: "24px",
              fontFamily: "monospace",
              textAlign: "center",
              marginLeft: "50px"
            }, onChange: this.handleChange,
            value: this.state.recipient, placeholder: 'Ethereum Address' })
        ),
        _react2.default.createElement('canvas', { className: 'item ToAvatar', ref: 'canvas', width: '96%', height: '96%', style: {
            border: "4px solid rgba(255,255,255,0.73)",
            borderRadius: "25em"
          }
        }),
        _react2.default.createElement(_TxObjects2.default, { selected_token_name: this.state.selected_token_name, send_button_value: 'Send',
          handleSend: this.handleSend, recipient: this.state.recipient })
      );
    };

    this.store = _WalletStates2.default;
    this.state = { recipient: '' };
    this.wallet = _electron.remote.getGlobal('wallet');
  }

}

// Utils


// Reflux action
exports.default = Transfer;