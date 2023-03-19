import BigNumber from 'bignumber.js';
import EventEmitter from 'eventemitter3';
import TransactionBuilder from './lib/transactionBuilder';
import Trx from './lib/trx';
import Contract from './lib/contract';
import Plugin from './lib/plugin';
import Event from './lib/event';
import SideChain from './lib/sidechain';
import type HttpProvider from './lib/providers/HttpProvider';
export default class TronWeb extends EventEmitter {
	providers: {
		HttpProvider: typeof HttpProvider;
	};
	static BigNumber: typeof BigNumber;
	static TransactionBuilder: typeof TransactionBuilder;
	static Trx: typeof Trx;
	static Contract: typeof Contract;
	static Plugin: typeof Plugin;
	static Event: typeof Event;
	static version: string;
	static utils: {
		code: typeof import('./utils/code');
		accounts: typeof import('./utils/accounts');
		base58: typeof import('./utils/base58');
		bytes: typeof import('./utils/bytes');
		crypto: typeof import('./utils/crypto');
		abi: typeof import('./utils/abi');
		message: typeof import('./utils/message');
		_TypedDataEncoder: typeof import('./utils/typedData').TypedDataEncoder;
		transaction: typeof import('./utils/transaction');
		ethersUtils: typeof import('./utils/ethersUtils');
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
	event: Event;
	transactionBuilder: TransactionBuilder;
	trx: Trx;
	plugin: Plugin;
	defaultBlock: boolean;
	defaultPrivateKey: string;
	defaultAddress: {
		hex: boolean;
		base58: boolean;
	};
	sidechain: SideChain;
	fullnodeVersion: string;
	feeLimit: number;
	injectPromise: (func: (...args: any) => any, ...args: any) => Promise<any>;
	fullNode: any;
	solidityNode: any;
	eventServer: any;
	constructor(
		options?:
			| boolean
			| {
					fullNode: string;
					fullHost?: string;
					solidityNode?: string;
					eventServer?: string;
					privateKey?: string;
					headers?: any;
					eventHeaders?: any;
					sideOptions?: any;
			  }
			| {
					fullNode?: string;
					fullHost: string;
					solidityNode?: string;
					eventServer?: string;
					privateKey?: string;
					headers?: any;
					eventHeaders?: any;
					sideOptions?: any;
			  },
		solidityNode?: boolean | string | undefined | HttpProvider,
		eventServer?: boolean | string | undefined | HttpProvider,
		sideOptions?: boolean | string | HttpProvider,
		privateKey?: boolean | string | undefined,
	);
	getFullnodeVersion(): Promise<void>;
	setDefaultBlock(blockID?: boolean): boolean | undefined;
	setPrivateKey(privateKey: any): void;
	setAddress(address: any): void;
	fullnodeSatisfies(version: any): boolean;
	isValidProvider(provider: any): boolean;
	setFullNode(fullNode: any): void;
	setSolidityNode(solidityNode: any): void;
	setEventServer(...params: any[]): void;
	setHeader(headers?: {}): void;
	setFullNodeHeader(headers?: {}): void;
	setEventHeader(headers?: {}): void;
	currentProviders(): {
		fullNode: any;
		solidityNode: any;
		eventServer: any;
	};
	currentProvider(): {
		fullNode: any;
		solidityNode: any;
		eventServer: any;
	};
	getEventResult(...params: any[]): any;
	getEventByTransactionID(...params: any[]): any;
	contract(abi?: any[], address?: string): Contract;
	static get address(): {
		fromHex(address: string): string;
		toHex(address: string): string;
		fromPrivateKey(privateKey: string, strict?: boolean): string | false;
	};
	static sha3(string: any, prefix?: boolean): string;
	static toHex(val: any): any;
	static toUtf8(hex: any): string;
	static fromUtf8(string: any): string;
	static toAscii(hex: any): string;
	static fromAscii(string: any, padding: any): string;
	static toDecimal(value: any): any;
	static fromDecimal(value: any): string;
	static fromSun(sun: any): any;
	static toSun(trx: BigNumber | number | string): number;
	static toBigNumber(amount?: number): number | BigNumber;
	static isAddress(address?: string | boolean): boolean;
	static createAccount(): Promise<{
		privateKey: string;
		publicKey: string;
		address: {
			base58: string;
			hex: string;
		};
	}>;
	static createRandom(options: any): {
		mnemonic: import('@ethersproject/hdnode').Mnemonic;
		privateKey: string;
		publicKey: string;
		address: string;
	};
	static fromMnemonic(
		mnemonic: any,
		path?: string,
		wordlist?: string,
	): {
		mnemonic: import('@ethersproject/hdnode').Mnemonic;
		privateKey: string;
		publicKey: string;
		address: string;
	};
	isConnected(callback?: boolean): Promise<any>;
}
