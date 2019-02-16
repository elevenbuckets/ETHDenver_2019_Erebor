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

var _WalletStates = require('../store/WalletStates');

var _WalletStates2 = _interopRequireDefault(_WalletStates);

var _WalletActions = require('../action/WalletActions');

var _WalletActions2 = _interopRequireDefault(_WalletActions);

var _GenSheets = require('./GenSheets');

var _GenSheets2 = _interopRequireDefault(_GenSheets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Reflux action
class Accounts extends _reflux2.default.Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      _WalletActions2.default.startUpdate(event.value, this.refs.canvas);
    };

    this.copyAddress = () => {
      var dummy = document.createElement("input");
      document.body.appendChild(dummy);
      dummy.setAttribute("id", "dummy_id");
      document.getElementById("dummy_id").value = this.state.address;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    };

    this.render = () => {
      return _react2.default.createElement(
        'div',
        { className: 'address' },
        _react2.default.createElement('canvas', { className: 'avatar', ref: 'canvas', width: '90px', height: '90px', style: this.state.address in this.state.passManaged ? this.state.passManaged[this.state.address] === true ? { border: '4px solid rgba(255,255,255,0.73)' } : { border: '4px solid rgba(255,0,0,0.73)' } : { border: '4px solid rgba(255,255,255,0.73)' } }),
        _react2.default.createElement(_reactDropdown2.default, { disabled: this.state.lesDelay, className: 'dropdown', options: this.state.accounts, style: { maxWidth: "700px", fontSize: "16px" },
          onChange: this.handleChange, value: this.state.address,
          placeholder: "You Have " + this.state.accounts.length + " Accounts" }),
        _react2.default.createElement('input', { type: 'image', src: './assets/copy.png', className: 'button copyAddr', style: {
            border: "0px"
          }, value: '', onClick: this.copyAddress }),
        _react2.default.createElement(_GenSheets2.default, null)
      );
    };

    this.store = _WalletStates2.default;
  }

}

// Views


// Reflux store
exports.default = Accounts;