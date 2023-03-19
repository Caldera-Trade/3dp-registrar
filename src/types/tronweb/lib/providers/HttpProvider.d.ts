export default class HttpProvider {
	constructor(
		host: any,
		timeout?: number,
		user?: boolean,
		password?: boolean,
		headers?: {},
		statusPage?: string,
	);
	setStatusPage(statusPage?: string): void;
	isConnected(statusPage?: any): Promise<any>;
	request(url: any, payload?: {}, method?: string): any;
}
