export default class Contract {
	constructor(tronWeb?: boolean, abi?: never[], address?: boolean);
	_getEvents(options?: {}): Promise<any>;
	_startEventListener(options: {} | undefined, callback: any): Promise<void>;
	_stopEventListener(): void;
	hasProperty(property: any): any;
	loadAbi(abi: any): void;
	decodeInput(data: any): {
		name: any;
		params: any;
	};
	new(options: any, privateKey?: any, callback?: boolean): Promise<any>;
	at(contractAddress: any, callback?: boolean): Promise<any>;
	events(
		options?: {},
		callback?: boolean,
	): {
		start(startCallback?: boolean): any;
		stop(): void;
	};
}
