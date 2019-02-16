'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WalletActions = _reflux2.default.createActions(['enqueue', 'dequeue', 'clearQueue', 'send', 'sendTxInQueue', 'selectAccount', 'batchSend', 'startUpdate', 'statusUpdate', 'finishUpdate', 'infoUpdate', 'selectedTokenUpdate', 'addQ', 'changeView', 'updateReceipts', 'sendTk', 'masterUpdate', 'confirmTx', 'cancelTx', 'sendTks', 'addressUpdate', 'gasPriceOptionSelect', 'customGasPriceUpdate', "schedule", "confirmScheduleTx", "cancelScheduleTx", 'enqueueSchedule', 'dequeueSchedule', 'clearQueueSchedule', 'batchSchedule', 'scheduleTxInQueue', 'deleteScheduledQ', 'deleteScheduledQs', 'initPlatform', "watchedTokenUpdate"]); // Reflux Actions
exports.default = WalletActions;