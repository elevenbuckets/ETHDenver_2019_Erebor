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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Reflux components 


// Reflux store
class GenSheets extends _reflux2.default.Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      console.log("event.value in GenSheets handleChange is " + event.value);
      let symbol = event.value.substring(0, event.value.indexOf(':'));
      console.log("Symbol in GenSheets handleChange is " + symbol);
      if (symbol != this.state.selected_token_name) _WalletActions2.default.selectedTokenUpdate(symbol);
    };

    this.ArrayRest = (array, element) => {
      let ans = [...array];
      ans.splice(array.indexOf(element), 1);
      return ans;
    };

    this.render = () => {
      return _react2.default.createElement(
        'div',
        { className: 'quickbalance' },
        _react2.default.createElement(
          'div',
          { className: 'item teth' },
          _react2.default.createElement(
            'p',
            null,
            'ETHER'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'item beth' },
          this.state.lesDelay === true ? _react2.default.createElement(
            'p',
            { style: { color: "white", fontSize: "22px" } },
            _react2.default.createElement(
              'span',
              { className: 'dot dotOne' },
              '-'
            ),
            _react2.default.createElement(
              'span',
              { className: 'dot dotTwo' },
              '-'
            ),
            _react2.default.createElement(
              'span',
              { className: 'dot dotThree' },
              '-'
            )
          ) : _react2.default.createElement(
            'p',
            { style: { color: "white", fontSize: "22px" } },
            this.state.balances['ETH']
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'item terc20' },
          _react2.default.createElement(_reactDropdown2.default, { disabled: this.state.lesDelay,
            options: this.state.selected_token_name != '' ? this.ArrayRest(this.state.tokenBalance, `${this.state.selected_token_name}: ${this.state.balances[this.state.selected_token_name]}`) : this.state.tokenBalance, onChange: this.handleChange, value: this.state.selected_token_name, placeholder: 'ERC20' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'item berc20' },
          this.state.lesDelay === true ? _react2.default.createElement(
            'p',
            { style: { fontSize: "22px" } },
            _react2.default.createElement(
              'span',
              { className: 'dot dotOne' },
              '-'
            ),
            _react2.default.createElement(
              'span',
              { className: 'dot dotTwo' },
              '-'
            ),
            _react2.default.createElement(
              'span',
              { className: 'dot dotThree' },
              '-'
            )
          ) : _react2.default.createElement(
            'p',
            { style: { fontSize: '22px' } },
            this.state.selected_token_name !== '' ? this.state.balances[this.state.selected_token_name] : this.state.tokenBalance.length
          )
        )
      );
    };

    this.store = _WalletStates2.default;
    this.state = {
      tokenBalances: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.address != prevState.address && this.state.tokenBalance.length == 0) {
      _WalletActions2.default.selectedTokenUpdate('');
    }
  }

  // Should NOT change the original array content
  // only works with set (an array with no repeated element)
}

// Reflux action
exports.default = GenSheets;