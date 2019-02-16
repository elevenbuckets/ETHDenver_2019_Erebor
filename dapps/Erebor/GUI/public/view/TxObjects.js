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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Reflux components
class TxObjects extends _reflux2.default.Component {
  constructor(props) {
    super(props);

    this.render = () => {
      let sendkind = this.state.selected_token_name !== '' ? this.state.selected_token_name : 'ETH';

      return _react2.default.createElement(
        'form',
        { className: 'item TxObj' },
        _react2.default.createElement(
          'table',
          { style: { margin: "0px" } },
          _react2.default.createElement(
            'tbody',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { width: '20%', style: { whiteSpace: 'nowrap' } },
                'Types',
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'div',
                  { style: {
                      textAlign: 'center',
                      width: "3.5em",
                      margin: "10px 40px 0 75px",
                      padding: "0px",
                      border: "1px solid white",
                      cursor: "pointer"
                    }, onClick: this.handleClick },
                  sendkind
                )
              ),
              _react2.default.createElement(
                'td',
                { width: '70%' },
                'Amount',
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'div',
                  { style: { marginTop: "10px", marginLeft: "15px" } },
                  _react2.default.createElement('input', { type: 'text', size: '32', style: {
                      backgroundColor: "rgba(255,255,255,0)",
                      border: "1px solid white",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "24px",
                      width: "300px",
                      textAlign: "right",
                      paddingRight: "12px",
                      marginLeft: "76px"
                    }, onChange: this.handleChangeAmount })
                )
              ),
              _react2.default.createElement(
                'td',
                { width: '10%' },
                _react2.default.createElement('input', { type: 'button', className: 'button', style: { margin: "40px 0 0 75px", fontSize: "22px" }, value: this.props.send_button_value, onClick: this.handleSend })
              )
            )
          )
        )
      );
    };

    this.store = _WalletStates2.default;
    // TODO: figure out why need this bind but Transfer.js does not 
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeGas = this.handleChangeGas.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeAmount(event) {
    console.log('got event: ' + event.target.value);

    let value = event.target.value;
    if (isNaN(value)) {
      this.openModal("Please enter a number!");
      event.target.value = value.slice(0, -1);
    } else {
      let amount = event.target.value;

      console.log('got amount: ' + amount);
      this.setState(() => {
        return { amount: amount };
      });
    }
  }

  handleChangeGas(event) {
    console.log('got event: ' + event.target.value);

    let value = event.target.value;
    if (isNaN(value)) {
      this.openModal("Please enter a number!");
      event.target.value = value.slice(0, -1);
    } else {
      let gas = event.target.value;
      console.log('got gas: ' + gas);
      this.setState(() => {
        return { gas: gas };
      });
    }
  }

  handleSend(event) {
    console.log("sending event" + event);
    let type = this.state.selected_token_name ? this.state.selected_token_name : "ETH";
    this.props.handleSend(this.props.recipient, type, this.state.amount, this.state.gas);
  }

  handleClick() {
    console.log("in handle click change token name function ....");
    if (this.state.address === null) return this.setState({ selected_token_name: '' });

    let list = Object.keys(this.state.balances).sort().filter(i => {
      if (this.state.balances[i] > 0) return i;
    });

    if (list.length === 0) return this.setState({ selected_token_name: '' });

    let symbol = this.state.selected_token_name === '' ? 'ETH' : this.state.selected_token_name;
    let index = list.indexOf(symbol);
    let ans = index === list.length - 1 ? list[0] : list[index + 1];
    this.setState({ selected_token_name: ans });
  }

}

// Reflux store
exports.default = TxObjects;