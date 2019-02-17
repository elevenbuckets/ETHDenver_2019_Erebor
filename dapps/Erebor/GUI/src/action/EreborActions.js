// Reflux Actions
import Reflux from 'reflux';
const EreborActions = Reflux.createActions(['startUpdate', 'statusUpdate', 'finishUpdate', 'infoUpdate','selectedTokenUpdate',
'addQ', 'changeView', 'updateReceipts', 'sendTk','masterUpdate', 'confirmTx', 'cancelTx', 'sendTks', 
'addressUpdate', 'gasPriceOptionSelect', 'customGasPriceUpdate', "schedule", "confirmScheduleTx", "cancelScheduleTx",
'enqueueSchedule', 'dequeueSchedule', 'clearQueueSchedule','batchSchedule', 'scheduleTxInQueue', 'deleteScheduledQ',
'deleteScheduledQs', 'initPlatform', "watchedTokenUpdate",'startMining', 'stopMining', 'renewMemberShip',
"buyMemberShip"]);
export default EreborActions;
