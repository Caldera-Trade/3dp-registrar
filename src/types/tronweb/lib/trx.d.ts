export default class Trx {
	constructor(tronWeb?: boolean);
	_parseToken(token: any): any;
	getCurrentBlock(): Promise<{
		blockID: string;
		block_header: {
			raw_data: {
				number: number;
				txTrieRoot: string;
				witness_address: string;
				parentHash: string;
				version: number;
				timestamp: number;
			};
			witness_signature: string;
		};
	}>;
	getConfirmedCurrentBlock(): Promise<{
		blockID: string;
		block_header: {
			raw_data: {
				number: number;
				txTrieRoot: string;
				witness_address: string;
				parentHash: string;
				version: number;
				timestamp: number;
			};
			witness_signature: string;
		};
	}>;
	getBlock(block?: any): Promise<any>;
	getBlockByHash(blockHash: any): Promise<any>;
	getBlockByNumber(blockID: any): Promise<any>;
	getBlockTransactionCount(block?: any): Promise<any>;
	getTransactionFromBlock(block: any, index: any): Promise<any>;
	getTransaction(transactionID: any): Promise<any>;
	getConfirmedTransaction(transactionID: string): Promise<
		| {
				ret: [{ contractRet: 'SUCCESS' | string }];
				signature: string[];
				txID: string;
				raw_data: {
					contract: unknown[];
					ref_block_bytes: string;
					ref_block_hash: string;
					expiration: number;
					timestamp: number;
				};
				raw_data_hex: string;
		  }
		| {
				ret: [{ contractRet: 'SUCCESS' | string }];
				signature: string[];
				txID: string;
				raw_data: {
					contract: unknown[];
					ref_block_bytes: string;
					ref_block_hash: string;
					expiration: number;
					fee_limit: number;
					timestamp: number;
				};
				raw_data_hex: string;
		  }
	>;
	getUnconfirmedTransactionInfo(transactionID: string): Promise<{
		id: string;
		blockNumber: number;
		blockTimeStamp: number;
		contractResult: [''];
		receipt: { net_usage: number };
		result?: 'FAILED' | string;
	}>;
	getTransactionInfo(transactionID: any): Promise<any>;
	_getTransactionInfoById(
		transactionID: any,
		options: any,
	): Promise<
		| {
				id: string;
				fee: number;
				blockNumber: number;
				blockTimeStamp: number;
				contractResult: string[];
				receipt: { net_fee: number };
		  }
		| {
				id: string;
				fee: number;
				blockNumber: number;
				blockTimeStamp: number;
				contractResult: string[];
				contract_address: string;
				receipt: {
					energy_fee: number;
					energy_usage_total: number;
					net_fee: number;
					result: 'SUCCESS' | 'OUT_OF_ENERGY' | string;
				};
				log: {
					address: string;
					topics: any[];
					data: string;
				};
				[];
		  }
	>;
	getTransactionsToAddress(
		address?: any,
		limit?: number,
		offset?: number,
	): Promise<any>;
	getTransactionsFromAddress(
		address?: any,
		limit?: number,
		offset?: number,
	): Promise<any>;
	getTransactionsRelated(
		address?: any,
		direction?: string,
		limit?: number,
		offset?: number,
	): Promise<any>;
	getAccount(address?: any): Promise<any>;
	getAccountById(id?: boolean): Promise<any>;
	getAccountInfoById(id: any, options: any): void;
	getBalance(address?: any): Promise<number>;
	getUnconfirmedAccount(address?: any): Promise<any>;
	getUnconfirmedAccountById(id: any): Promise<any>;
	getUnconfirmedBalance(address?: any): Promise<any>;
	getBandwidth(address?: any): Promise<any>;
	getTokensIssuedByAddress(address?: any): Promise<any>;
	getTokenFromID(tokenID?: boolean): Promise<any>;
	listNodes(): Promise<any>;
	getBlockRange(start?: number, end?: number): Promise<any>;
	listSuperRepresentatives(): Promise<any>;
	listTokens(limit?: number, offset?: number): Promise<any>;
	timeUntilNextVoteCycle(): Promise<any>;
	getContract(contractAddress: any): Promise<any>;
	verifyMessage(
		message?: boolean,
		signature?: boolean,
		address?: any,
		useTronHeader?: boolean,
	): Promise<any>;
	static verifySignature(
		message: any,
		address: any,
		signature: any,
		useTronHeader?: boolean,
	): boolean;
	verifyMessageV2(
		message?: boolean,
		signature?: boolean,
		options?: {},
	): Promise<any>;
	static verifyMessageV2(message: any, signature: any): string;
	verifyTypedData(
		domain: any,
		types: any,
		value: any,
		signature: any,
		address?: any,
	): Promise<any>;
	static verifyTypedData(
		domain: any,
		types: any,
		value: any,
		signature: any,
		address: any,
	): boolean;
	sign(
		transaction?: boolean,
		privateKey?: any,
		useTronHeader?: boolean,
		multisig?: boolean,
	): Promise<any>;
	static signString(
		message: any,
		privateKey: any,
		useTronHeader?: boolean,
	): string;
	/**
	 * sign message v2 for verified header length
	 *
	 * @param {message to be signed, should be Bytes or string} message
	 * @param {privateKey for signature} privateKey
	 * @param {reserved} options
	 */
	signMessageV2(message: any, privateKey?: any, options?: {}): Promise<any>;
	static signMessageV2(message: any, privateKey: any): any;
	_signTypedData(
		domain: any,
		types: any,
		value: any,
		privateKey?: any,
	): Promise<any>;
	static _signTypedData(
		domain: any,
		types: any,
		value: any,
		privateKey: any,
	): string;
	multiSign(
		transaction?: boolean,
		privateKey?: any,
		permissionId?: boolean,
	): Promise<any>;
	getApprovedList(transaction: any): Promise<any>;
	getSignWeight(transaction: any, permissionId: any): Promise<any>;
	sendRawTransaction(signedTransaction?: boolean, options?: {}): Promise<any>;
	sendHexTransaction(
		signedHexTransaction?: boolean,
		options?: {},
	): Promise<any>;
	sendTransaction(to?: boolean, amount?: boolean, options?: {}): Promise<any>;
	sendToken(
		to?: boolean,
		amount?: boolean,
		tokenID?: boolean,
		options?: {},
	): Promise<any>;
	/**
	 * Freezes an amount of TRX.
	 * Will give bandwidth OR Energy and TRON Power(voting rights)
	 * to the owner of the frozen tokens.
	 *
	 * @param amount - is the number of frozen trx
	 * @param duration - is the duration in days to be frozen
	 * @param resource - is the type, must be either "ENERGY" or "BANDWIDTH"
	 * @param options
	 */
	freezeBalance(
		amount?: number,
		duration?: number,
		resource?: string,
		options?: {},
		receiverAddress?: undefined,
	): Promise<any>;
	/**
	 * Unfreeze TRX that has passed the minimum freeze duration.
	 * Unfreezing will remove bandwidth and TRON Power.
	 *
	 * @param resource - is the type, must be either "ENERGY" or "BANDWIDTH"
	 * @param options
	 */
	unfreezeBalance(
		resource?: string,
		options?: {},
		receiverAddress?: undefined,
	): Promise<any>;
	/**
	 * Modify account name
	 * Note: Username is allowed to edit only once.
	 *
	 * @param privateKey - Account private Key
	 * @param accountName - name of the account
	 *
	 * @return modified Transaction Object
	 */
	updateAccount(accountName?: boolean, options?: {}): Promise<any>;
	signMessage(...args: any[]): Promise<any>;
	sendAsset(...args: any[]): Promise<any>;
	send(...args: any[]): Promise<any>;
	/** amount is SUN */
	sendTrx(
		to: string,
		amount: BigNumber | string | number,
		options?: { privateKey: string },
	): Promise<{
		result: boolean;
		txid: string;
		transaction: {
			visible: boolean;
			txID: string;
			raw_data: {
				contract: unknown[];
				ref_block_bytes: string;
				ref_block_hash: string;
				expiration: number;
				timestamp: number;
			};
			raw_data_hex: string;
			signature: string[];
		};
	}>;
	broadcast(...args: any[]): any;
	broadcastHex(...args: any[]): any;
	signTransaction(
		transaction: any,
		privateKey: string,
		useTronHeader = true,
		multisig = false,
	): Promise<any>;
	/**
	 * Gets a network modification proposal by ID.
	 */
	getProposal(proposalID?: boolean): Promise<any>;
	/**
	 * Lists all network modification proposals.
	 */
	listProposals(): Promise<any>;
	/**
	 * Lists all parameters available for network modification proposals.
	 */
	getChainParameters(): Promise<any>;
	/**
	 * Get the account resources
	 */
	getAccountResources(address?: any): Promise<any>;
	/**
	 * Query the amount of resources of a specific resourceType delegated by fromAddress to toAddress
	 */
	getDelegatedResourceV2(
		fromAddress?: any,
		toAddress?: any,
		options?: {
			confirmed: boolean;
		},
	): Promise<any>;
	/**
	 * Query the resource delegation index by an account
	 */
	getDelegatedResourceAccountIndexV2(
		address?: any,
		options?: {
			confirmed: boolean;
		},
	): Promise<any>;
	/**
	 * Query the amount of delegatable resources of the specified resource Type for target address, unit is sun.
	 */
	getCanDelegatedMaxSize(
		address?: any,
		resource?: string,
		options?: {
			confirmed: boolean;
		},
	): Promise<any>;
	/**
	 * Remaining times of available unstaking API
	 */
	getAvailableUnfreezeCount(
		address?: any,
		options?: {
			confirmed: boolean;
		},
	): Promise<any>;
	/**
	 * Query the withdrawable balance at the specified timestamp
	 */
	getCanWithdrawUnfreezeAmount(
		address?: any,
		timestamp?: number,
		options?: {
			confirmed: boolean;
		},
	): Promise<any>;
	/**
	 * Get the exchange ID.
	 */
	getExchangeByID(exchangeID?: boolean): Promise<any>;
	/**
	 * Lists the exchanges
	 */
	listExchanges(): Promise<any>;
	/**
	 * Lists all network modification proposals.
	 */
	listExchangesPaginated(limit?: number, offset?: number): Promise<any>;
	/**
	 * Get info about thre node
	 */
	getNodeInfo(): Promise<any>;
	getTokenListByName(tokenID?: boolean): Promise<any>;
	getTokenByID(tokenID?: boolean): Promise<any>;
	getReward(address: any, options?: {}): Promise<any>;
	getUnconfirmedReward(address: any, options?: {}): Promise<any>;
	getBrokerage(address: any, options?: {}): Promise<any>;
	getUnconfirmedBrokerage(address: any, options?: {}): Promise<any>;
	_getReward(address: any, options: any): Promise<any>;
	_getBrokerage(address: any, options: any): Promise<any>;
}
