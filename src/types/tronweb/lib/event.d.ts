import TronWeb from '../index';
export default class Event {
	constructor(tronWeb?: TronWeb | boolean);
	setServer(eventServer?: boolean, healthcheck?: string): false | undefined;
	getEventsByContractAddress(
		contractAddress?: boolean,
		options?: {},
		callback?: boolean,
	): any;
	getEventsByTransactionID(
		transactionID?: boolean,
		options?: {},
		callback?: boolean,
	): any;
}
