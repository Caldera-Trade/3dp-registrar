export default class Method {
	constructor(contract: any, abi: any);
	decodeInput(data: any): any;
	onMethod(...args: any[]): {
		call: (options?: {}, callback?: boolean) => Promise<any>;
		send: (
			options?: {},
			privateKey?: any,
			callback?: boolean,
		) => Promise<any>;
		watch: (...methodArgs: any[]) => Promise<any>;
	};
	_call(
		types: any,
		args: any,
		options?: {},
		callback?: boolean,
	): Promise<any>;
	_send(
		types: any,
		args: any,
		options?: {},
		privateKey?: any,
		callback?: boolean,
	): Promise<any>;
	_watch(options?: {}, callback?: boolean): Promise<any>;
}
