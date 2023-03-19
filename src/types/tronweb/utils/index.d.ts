import * as accounts from './accounts';
import * as base58 from './base58';
import * as bytes from './bytes';
import * as crypto from './crypto';
import * as code from './code';
import * as abi from './abi';
import * as message from './message';
import * as ethersUtils from './ethersUtils';
import { TypedDataEncoder as _TypedDataEncoder } from './typedData';
import * as transaction from './transaction';
declare const _default: {
	code: typeof code;
	accounts: typeof accounts;
	base58: typeof base58;
	bytes: typeof bytes;
	crypto: typeof crypto;
	abi: typeof abi;
	message: typeof message;
	_TypedDataEncoder: typeof _TypedDataEncoder;
	transaction: typeof transaction;
	ethersUtils: typeof ethersUtils;
	isValidURL(url: any): any;
	isObject(obj: any): boolean;
	isArray(array: any): boolean;
	isJson(string: any): boolean;
	isBoolean(bool: any): boolean;
	isBigNumber(number: any): any;
	isString(string: any): any;
	isFunction(obj: any): boolean;
	isHex(string: any): boolean;
	isInteger(number: any): boolean;
	hasProperty(obj: any, property: any): boolean;
	hasProperties(obj: any, ...properties: any[]): boolean | 0;
	mapEvent(event: any): {
		block: any;
		timestamp: any;
		contract: any;
		name: any;
		transaction: any;
		result: any;
		resourceNode: any;
	};
	parseEvent(
		event: any,
		{
			inputs: abi,
		}: {
			inputs: any;
		},
	): any;
	padLeft(input: any, padding: any, amount: any): any;
	isNotNullOrUndefined(val: any): boolean;
	sleep(millis?: number): Promise<unknown>;
};
export default _default;
