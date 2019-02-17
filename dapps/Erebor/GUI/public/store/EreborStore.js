'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Utils = require('../util/Utils');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EreborActions = require('../action/EreborActions');

var _EreborActions2 = _interopRequireDefault(_EreborActions);

var _loopasync = require('loopasync');

var _loopasync2 = _interopRequireDefault(_loopasync);

var _electron = require('electron');

var _reactToastify = require('react-toastify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EreborStore extends _reflux2.default.Store {
	constructor() {
		super();

		this.onStartMining = () => {
			this.erebor.startTrial(200);
			this.setState({ mining: true });
		};

		this.onStopMining = () => {
			this.erebor.stopTrial();
			this.setState({ mining: false });
		};

		this.appendMiningMessage = message => {
			if (this.state.currentMiningMessages.length >= 10) {
				let messages = [...this.state.currentMiningMessages];
				messages = messages.slice(1, 10);
				this.setState({ currentMiningMessages: [...messages, message] });
			} else {
				this.setState({ currentMiningMessages: [...this.state.currentMiningMessages, message] });
			}
		};

		this.state = {
			lesDelay: false,
			blockHeight: null,
			blockTime: null,
			highestBlock: 0,
			address: null,
			selected_token_name: '',
			balances: { 'ETH': 0 },
			connected: true,
			wait4peers: true,
			syncInProgress: false,
			canQuit: true,
			stateMsg: null,
			result: null,
			currentMiningMessages: ["Currently mining, the expected mined time is 10 min,", "Keep going"],
			mining: false
		};

		this.listenables = _EreborActions2.default;
		this.erebor = _electron.remote.getGlobal('erebor');
		// this.erebor.client.subscribe('ethstats');

		//Overwrite the function with pass the state
		this.reactStateTrigger = state => {
			if (state.stateMsg) {
				this.appendMiningMessage(state.stateMsg);
			}
			if (state.result) {
				(0, _reactToastify.toast)(_react2.default.createElement(
					'div',
					null,
					'Congratulation! Just mined a token successfully'
				));
			}
			this.setState(state);
		};

		this.erebor.setReactStateTrigger(this.reactStateTrigger);

		// this.addressUpdate = () => {
		// 	if (this.state.lesDelay === true || this.state.address === null) return; // do nothing, since statusUpdate is doing it already
		// 	console.log(`DEBUG: address Update is called`);
		// 	this._count = 0;
		// 	this._target = this.state.tokenList.length + 1;
		// 	this._balances = { 'ETH': 0 };
		// 	this._tokenBalance = [];

		// 	if (this.erebor.userErebor == this.state.address) {
		// 		//loopasync(['ETH', ...this.state.tokenList], EreborActions.statusUpdate, 1);
		// 		['ETH', ...this.state.tokenList].map((t) => { EreborActions.statusUpdate(t); })
		// 	} else if (typeof (this.state.passManaged[this.state.address]) === 'undefined') {
		// 		this.erebor.linkAccount(this.state.address)
		// 			.then((r) => {
		// 				this.setState({ passManaged: { [this.state.address]: r.result } });
		// 				//loopasync(['ETH', ...this.state.tokenList], EreborActions.statusUpdate, 1);
		// 				['ETH', ...this.state.tokenList].map((t) => { EreborActions.statusUpdate(t); })
		// 			})
		// 			.catch((err) => {
		// 				console.trace(err);
		// 				//this.setState({address: null});
		// 				//EreborActions.finishUpdate();
		// 			})
		// 	}
		// }

		// this.erebor.handleStats = (stats) => {
		// 	if (stats.connected === false) {
		// 		return this.setState({ connected: false });
		// 	} else if (stats.blockHeight === 0) {
		// 		return this.setState({ wait4peers: true, connected: true });
		// 	} else if (stats.blockHeight !== stats.highestBlock) {
		// 		return this.setState({ syncInProgress: true, connected: true, wait4peers: false });
		// 	} else {
		// 		this.setState({ ...stats, wait4peers: false, syncInProgress: false });
		// 	}

		// 	this.erebor.gasPriceEst().then((est) => {
		// 		this.setState({ gasPriceInfo: est, gasPrice: est[this.state.gasPriceOption] });
		// 	})
		// }

		// this.erebor.client.on('ethstats', this.erebor.handleStats);
		// this.erebor.client.subscribe("synctokens");

		// this.syncTokens = () => {
		// 	console.log(`syncTokenHandler is called`)
		// 	EreborActions.watchedTokenUpdate();
		// }

		// this.erebor.client.on('synctokens', this.syncTokens);
		this.erebor.linkAccount(this.erebor.address);
		this.setState({ address: this.erebor.address });

		this._count;
		this._target;
		this.retryTimer;

		// Init
		// this.erebor.handleStats({});
		// this.syncTokens();
	}

	// Reflux Action responses
	// onStartUpdate(address, canvas) {
	// 	console.log(`DEBUG: calling start Update Reflux Action......`);

	// 	clearTimeout(this.retryTimer); this.retryTimer = undefined;

	// 	if (this.state.showingBlock != 0 && this.state.showingBlock < this.state.blockHeight) {
	// 		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!retrying status update soon...")
	// 		this.setState({ address: address, lesDelay: true, tokenBalance: [], showingBlock: 0 }); // is this correct ???
	// 		createCanvasWithAddress(canvas, this.state.address);
	// 		this.retryTimer = setTimeout(() => { return EreborActions.startUpdate(address, canvas) }, 997);
	// 		return
	// 	}

	// 	this.setState({ showingBlock: this.state.blockHeight });
	// 	this._count = 0;
	// 	this._target = this.state.tokenList.length + 1;
	// 	this._balances = { 'ETH': 0 };
	// 	this._tokenBalance = [];
	// 	let stage = Promise.resolve();

	// 	stage = stage.then(() => {
	// 		this.setState({ address: address, lesDelay: true, tokenBalance: [] });
	// 		createCanvasWithAddress(canvas, this.state.address);
	// 		return this.erebor.linkAccount(address); // define app specific 'userErebor' as class attribute if returns 'true'
	// 	})

	// 	stage = stage.then((r) => {
	// 		this.setState({ passManaged: { [this.state.address]: r.result } });
	// 		loopasync(['ETH', ...this.state.tokenList], EreborActions.statusUpdate, 1);
	// 	})
	// 		.catch((err) => {
	// 			console.trace(err);
	// 			//this.setState({address: null});
	// 			//createCanvasWithAddress(canvas, '0x');
	// 			//EreborActions.finishUpdate();
	// 		})
	// }

	// onStatusUpdate(symbol) {
	// 	if (symbol != 'ETH') {
	// 		this.erebor.addrTokenBalance(symbol)(this.state.address).then((b) => {
	// 			let b9 = Number(this.erebor.toEth(b, this.erebor.TokenInfo[symbol].decimals).toFixed(9));
	// 			if (b9 > 0) {
	// 				let stats = { [symbol]: b9 };
	// 				let a = [...this._tokenBalance, `${symbol}: ${b9}`];
	// 				this._balances = { ...this._balances, ...stats };
	// 				this._tokenBalance = [...new Set(a)];
	// 			}
	// 			this._count++;
	// 			if (this._count == this._target) EreborActions.finishUpdate();
	// 		})
	// 	} else {
	// 		this.erebor.addrEtherBalance(this.state.address).then((b) => {
	// 			let b9 = Number(this.erebor.toEth(b, 18).toFixed(9));
	// 			let stats = { [symbol]: b9 };
	// 			this._balances = { ...this._balances, ...stats };
	// 			this._count++;
	// 			if (this._count == this._target) EreborActions.finishUpdate();
	// 		})
	// 	}

	// }

	// onFinishUpdate() {
	// 	this.setState({ lesDelay: false, balances: this._balances, tokenBalance: this._tokenBalance, showingBlock: this.state.blockHeight });
	// 	this._balances = { 'ETH': 0 };
	// 	this._tokenBalance = [];
	// }

}

exports.default = EreborStore;