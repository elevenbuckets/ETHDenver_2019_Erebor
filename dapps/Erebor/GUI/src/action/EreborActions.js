// Reflux Actions
import Reflux from 'reflux';
const EreborActions = Reflux.createActions(['enqueue', 'dequeue', 'clearQueue', 'send', 'sendTxInQueue',
'selectAccount', 'batchSend','startUpdate', 'statusUpdate', 'finishUpdate', 'infoUpdate','selectedTokenUpdate',
'addQ', 'changeView', 'updateReceipts', 'sendTk','masterUpdate', 'confirmTx', 'cancelTx', 'sendTks', 
'addressUpdate', 'gasPriceOptionSelect', 'customGasPriceUpdate', "schedule", "confirmScheduleTx", "cancelScheduleTx",
'enqueueSchedule', 'dequeueSchedule', 'clearQueueSchedule','batchSchedule', 'scheduleTxInQueue', 'deleteScheduledQ',
'deleteScheduledQs', 'initPlatform', "watchedTokenUpdate"]);
export default EreborActions;
