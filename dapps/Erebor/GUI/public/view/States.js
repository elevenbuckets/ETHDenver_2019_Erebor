'use strict';

// Third-parties

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _electron = require('electron');

var _WalletStates = require('../store/WalletStates');

var _WalletStates2 = _interopRequireDefault(_WalletStates);

var _WalletActions = require('../action/WalletActions');

var _WalletActions2 = _interopRequireDefault(_WalletActions);

var _Constants = require('../util/Constants');

var _Constants2 = _interopRequireDefault(_Constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Reflux action
class States extends _reflux2.default.Component {
    constructor(props) {
        super(props);

        this.render = () => {
            return _react2.default.createElement(
                'div',
                { className: 'state slocked' },
                _react2.default.createElement(
                    'div',
                    { className: 'item tblockheight' },
                    _react2.default.createElement(
                        'p',
                        null,
                        'Block Height'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'item tblockstamp' },
                    _react2.default.createElement(
                        'p',
                        null,
                        'Block Stamp'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'item tlocaltime' },
                    _react2.default.createElement(
                        'p',
                        null,
                        'Local Time'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'item tgasprice' },
                    _react2.default.createElement(
                        'p',
                        null,
                        'Gas Price'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'item blockheight' },
                    _react2.default.createElement(
                        'p',
                        { id: 'cbh' },
                        this.state.blockHeight
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'item blockstamp' },
                    _react2.default.createElement(
                        'p',
                        { id: 'cbs' },
                        this.state.blockTime
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'item localtime' },
                    _react2.default.createElement(
                        'p',
                        { id: 'clt' },
                        String(this.state.localTime).substring(0, 24)
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'item gasprice' },
                    _react2.default.createElement(
                        'p',
                        { id: 'cgp' },
                        this.wallet.toEth(this.state.gasPrice, 9).toString()
                    )
                )
            );
        };

        this.store = _WalletStates2.default;
        this.wallet = _electron.remote.getGlobal('wallet');

        this.state = {
            unixTime: 123213,
            localTime: null
        };

        this.getDashInfo = () => {
            this.setState(() => {
                return { localTime: new Date(), unixTime: Date.now() / 1000 };
            });
        };
    }

    componentWillMount() {
        super.componentWillMount();
        this.getDashInfo();
    }

    componentDidMount() {
        this.timer = setInterval(this.getDashInfo, 1000);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        clearInterval(this.timer);
    }

}

// constants utilities


// Reflux store
exports.default = States;