import Reflux from 'reflux';
import { createCanvasWithAddress } from "../util/Utils";
import EreborActions from '../action/EreborActions';
import loopasync from 'loopasync';
import { remote } from 'electron';

class EreborStore extends Reflux.Store {
	constructor() {
		super();

		this.state =
			{
				tokenBalance: [],
				passManaged: {},
				accounts: [],
				lesDelay: false,
				blockHeight: null,
				blockTime: null,
				highestBlock: 0,
				gasPrice: 0,
				address: null,
				selected_token_name: '',
				balances: { 'ETH': 0 },
				gasPriceOption: "high",
				customGasPrice: null,
				gasPriceInfo: null,
				tokenList: [],
				showingBlock: 0,
				connected: true,
				wait4peers: true,
				syncInProgress: false
			}

		this.listenables = EreborActions;
		this.erebor = remote.getGlobal('erebor');
		this.erebor.client.subscribe('ethstats');
		this.setState({ gasPrice: this.erebor.configs.defaultGasPrice }); // does not really work, since CP control gas price

		this.addressUpdate = () => {
			if (this.state.lesDelay === true || this.state.address === null) return; // do nothing, since statusUpdate is doing it already
			console.log(`DEBUG: address Update is called`);
			this._count = 0;
			this._target = this.state.tokenList.length + 1;
			this._balances = { 'ETH': 0 };
			this._tokenBalance = [];

			if (this.erebor.userErebor == this.state.address) {
				//loopasync(['ETH', ...this.state.tokenList], EreborActions.statusUpdate, 1);
				['ETH', ...this.state.tokenList].map((t) => { EreborActions.statusUpdate(t); })
			} else if (typeof (this.state.passManaged[this.state.address]) === 'undefined') {
				this.erebor.linkAccount(this.state.address)
					.then((r) => {
						this.setState({ passManaged: { [this.state.address]: r.result } });
						//loopasync(['ETH', ...this.state.tokenList], EreborActions.statusUpdate, 1);
						['ETH', ...this.state.tokenList].map((t) => { EreborActions.statusUpdate(t); })
					})
					.catch((err) => {
						console.trace(err);
						//this.setState({address: null});
						//EreborActions.finishUpdate();
					})
			}
		}

		this.erebor.handleStats = (stats) => {
			if (stats.connected === false) {
				return this.setState({ connected: false });
			} else if (stats.blockHeight === 0) {
				return this.setState({ wait4peers: true, connected: true });
			} else if (stats.blockHeight !== stats.highestBlock) {
				return this.setState({ syncInProgress: true, connected: true, wait4peers: false });
			} else {
				this.setState({ ...stats, wait4peers: false, syncInProgress: false });
			}

			this.erebor.allAccounts().then((addrs) => {
				if (addrs.length !== this.state.accounts.length) this.setState({ accounts: addrs });

				if (this.state.address !== null) {
					return this.addressUpdate();
				} else {
					this.setState({ balances: { 'ETH': 0 }, selected_token_name: '' });
				}
			});

			this.erebor.gasPriceEst().then((est) => {
				this.setState({ gasPriceInfo: est, gasPrice: est[this.state.gasPriceOption] });
			})
		}

		this.erebor.client.on('ethstats', this.erebor.handleStats);
		this.erebor.client.subscribe("synctokens");

		this.syncTokens = () => {
			console.log(`syncTokenHandler is called`)
			EreborActions.watchedTokenUpdate();
		}

		this.erebor.client.on('synctokens', this.syncTokens);

		this._count;
		this._target;
		this.retryTimer;

 		// Init
		this.erebor.handleStats({});
		this.syncTokens();
	}

	// Reflux Action responses
	onStartUpdate(address, canvas) {
		console.log(`DEBUG: calling start Update Reflux Action......`);

		clearTimeout(this.retryTimer); this.retryTimer = undefined;

		if (this.state.showingBlock != 0 && this.state.showingBlock < this.state.blockHeight) {
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!retrying status update soon...")
			this.setState({ address: address, lesDelay: true, tokenBalance: [], showingBlock: 0 }); // is this correct ???
			createCanvasWithAddress(canvas, this.state.address);
			this.retryTimer = setTimeout(() => { return EreborActions.startUpdate(address, canvas) }, 997);
			return
		}

		this.setState({ showingBlock: this.state.blockHeight });
		this._count = 0;
		this._target = this.state.tokenList.length + 1;
		this._balances = { 'ETH': 0 };
		this._tokenBalance = [];
		let stage = Promise.resolve();

		stage = stage.then(() => {
			this.setState({ address: address, lesDelay: true, tokenBalance: [] });
			createCanvasWithAddress(canvas, this.state.address);
			return this.erebor.linkAccount(address); // define app specific 'userErebor' as class attribute if returns 'true'
		})

		stage = stage.then((r) => {
			this.setState({ passManaged: { [this.state.address]: r.result } });
			loopasync(['ETH', ...this.state.tokenList], EreborActions.statusUpdate, 1);
		})
			.catch((err) => {
				console.trace(err);
				//this.setState({address: null});
				//createCanvasWithAddress(canvas, '0x');
				//EreborActions.finishUpdate();
			})
	}

	onStatusUpdate(symbol) {
		if (symbol != 'ETH') {
			this.erebor.addrTokenBalance(symbol)(this.state.address).then((b) => {
				let b9 = Number(this.erebor.toEth(b, this.erebor.TokenInfo[symbol].decimals).toFixed(9));
				if (b9 > 0) {
					let stats = { [symbol]: b9 };
					let a = [...this._tokenBalance, `${symbol}: ${b9}`];
					this._balances = { ...this._balances, ...stats };
					this._tokenBalance = [...new Set(a)];
				}
				this._count++;
				if (this._count == this._target) EreborActions.finishUpdate();
			})
		} else {
			this.erebor.addrEtherBalance(this.state.address).then((b) => {
				let b9 = Number(this.erebor.toEth(b, 18).toFixed(9));
				let stats = { [symbol]: b9 };
				this._balances = { ...this._balances, ...stats };
				this._count++;
				if (this._count == this._target) EreborActions.finishUpdate();
			})
		}

	}

	onFinishUpdate() {
		this.setState({ lesDelay: false, balances: this._balances, tokenBalance: this._tokenBalance, showingBlock: this.state.blockHeight });
		this._balances = { 'ETH': 0 };
		this._tokenBalance = [];
	}

	onSelectedTokenUpdate(value) {
		this.setState({ selected_token_name: value });
	}

	onSend(fromAddr, addr, type, amount) {
		if (fromAddr !== this.erebor.userErebor) {
			console.log("no password"); return;
		}
		let weiAmount = type === 'ETH' ? this.erebor.toWei(amount, 18).toString() : this.erebor.toWei(amount, this.erebor.TokenInfo[type].decimals).toString();
		this.erebor.sendTx(type)(addr, weiAmount)
			.then((qid) => { return this.erebor.getReceipts(qid); })
			.then((r) => { console.dir(r); })
			.catch((err) => { console.trace(err); });
	}

	onWatchedTokenUpdate() {
		return this.erebor.client.call('hotGroupInfo').then((info) => {
			this.setState({ tokenList: Object.keys(info) })
			this.erebor.TokenInfo = info;
			return true;
		})
		.then(() => {
			this.addressUpdate();
		})
		.catch((err) => {
			console.trace(err);
			return false;
		})
	}
}

export default EreborStore;
