export default class TransactionBuilder {
	constructor(tronWeb?: boolean);
	sendTrx(
		to: string,
		amount: number | string | BigNumber,
		from: string,
		options: { privateKey: string },
	): Promise<{
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
	}>;
	sendToken(
		to: boolean | undefined,
		amount: number | undefined,
		tokenID: boolean | undefined,
		from: any,
		options: any,
		callback?: boolean,
	): any;
	purchaseToken(
		issuerAddress: boolean | undefined,
		tokenID: boolean | undefined,
		amount: number | undefined,
		buyer: any,
		options: any,
		callback?: boolean,
	): any;
	freezeBalance(
		amount: number | undefined,
		duration: number | undefined,
		resource: string | undefined,
		address: any,
		receiverAddress: undefined,
		options: any,
		callback?: boolean,
	): any;
	unfreezeBalance(
		resource: string | undefined,
		address: any,
		receiverAddress: undefined,
		options: any,
		callback?: boolean,
	): any;
	freezeBalanceV2(
		amount: number | undefined,
		resource: string | undefined,
		address: any,
		options: any,
		callback?: boolean,
	): any;
	unfreezeBalanceV2(
		amount: number | undefined,
		resource: string | undefined,
		address: any,
		options: any,
		callback?: boolean,
	): any;
	delegateResource(
		amount: number | undefined,
		receiverAddress: any,
		resource: string | undefined,
		address: any,
		lock: boolean | undefined,
		options: any,
		callback?: boolean,
	): any;
	undelegateResource(
		amount: number | undefined,
		receiverAddress: any,
		resource: string | undefined,
		address: any,
		options: any,
		callback?: boolean,
	): any;
	withdrawExpireUnfreeze(address: any, options: any, callback?: boolean): any;
	withdrawBlockRewards(address: any, options: any, callback?: boolean): any;
	applyForSR(
		address: any,
		url: boolean | undefined,
		options: any,
		callback?: boolean,
	): any;
	vote(
		votes: {} | undefined,
		voterAddress: any,
		options: any,
		callback?: boolean,
	): any;
	createSmartContract(
		options?: {},
		issuerAddress?: any,
		callback?: boolean,
	): any;
	triggerSmartContract(...params: any[]): any;
	triggerConstantContract(...params: any[]): any;
	triggerConfirmedConstantContract(...params: any[]): any;
	estimateEnergy(...params: any[]): any;
	_triggerSmartContract(
		contractAddress: any,
		functionSelector: any,
		options?: {},
		parameters?: never[],
		issuerAddress?: any,
		callback?: boolean,
	): any;
	clearABI(contractAddress: any, ownerAddress?: any, callback?: boolean): any;
	updateBrokerage(
		brokerage: any,
		ownerAddress?: any,
		callback?: boolean,
	): any;
	createToken(options?: {}, issuerAddress?: any, callback?: boolean): any;
	createAccount(
		accountAddress: any,
		address: any,
		options: any,
		callback?: boolean,
	): any;
	updateAccount(
		accountName: boolean | undefined,
		address: any,
		options: any,
		callback?: boolean,
	): any;
	setAccountId(accountId: any, address?: any, callback?: boolean): any;
	updateToken(options?: {}, issuerAddress?: any, callback?: boolean): any;
	sendAsset(...args: any[]): any;
	purchaseAsset(...args: any[]): any;
	createAsset(...args: any[]): any;
	updateAsset(...args: any[]): any;
	/**
	 * Creates a proposal to modify the network.
	 * Can only be created by a current Super Representative.
	 */
	createProposal(
		parameters: boolean | undefined,
		issuerAddress: any,
		options: any,
		callback?: boolean,
	): any;
	/**
	 * Deletes a network modification proposal that the owner issued.
	 * Only current Super Representative can vote on a proposal.
	 */
	deleteProposal(
		proposalID: boolean | undefined,
		issuerAddress: any,
		options: any,
		callback?: boolean,
	): any;
	/**
	 * Adds a vote to an issued network modification proposal.
	 * Only current Super Representative can vote on a proposal.
	 */
	voteProposal(
		proposalID: boolean | undefined,
		isApproval: boolean | undefined,
		voterAddress: any,
		options: any,
		callback?: boolean,
	): any;
	/**
	 * Create an exchange between a token and TRX.
	 * Token Name should be a CASE SENSITIVE string.
	 * PLEASE VERIFY THIS ON TRONSCAN.
	 */
	createTRXExchange(
		tokenName: any,
		tokenBalance: any,
		trxBalance: any,
		ownerAddress: any,
		options: any,
		callback?: boolean,
	): any;
	/**
	 * Create an exchange between a token and another token.
	 * DO NOT USE THIS FOR TRX.
	 * Token Names should be a CASE SENSITIVE string.
	 * PLEASE VERIFY THIS ON TRONSCAN.
	 */
	createTokenExchange(
		firstTokenName: any,
		firstTokenBalance: any,
		secondTokenName: any,
		secondTokenBalance: any,
		ownerAddress: any,
		options: any,
		callback?: boolean,
	): any;
	/**
	 * Adds tokens into a bancor style exchange.
	 * Will add both tokens at market rate.
	 * Use "_" for the constant value for TRX.
	 */
	injectExchangeTokens(
		exchangeID: boolean | undefined,
		tokenName: boolean | undefined,
		tokenAmount: number | undefined,
		ownerAddress: any,
		options: any,
		callback?: boolean,
	): any;
	/**
	 * Withdraws tokens from a bancor style exchange.
	 * Will withdraw at market rate both tokens.
	 * Use "_" for the constant value for TRX.
	 */
	withdrawExchangeTokens(
		exchangeID: boolean | undefined,
		tokenName: boolean | undefined,
		tokenAmount: number | undefined,
		ownerAddress: any,
		options: any,
		callback?: boolean,
	): any;
	/**
	 * Trade tokens on a bancor style exchange.
	 * Expected value is a validation and used to cap the total amt of token 2 spent.
	 * Use "_" for the constant value for TRX.
	 */
	tradeExchangeTokens(
		exchangeID: boolean | undefined,
		tokenName: boolean | undefined,
		tokenAmountSold: number | undefined,
		tokenAmountExpected: number | undefined,
		ownerAddress: any,
		options: any,
		callback?: boolean,
	): any;
	/**
	 * Update userFeePercentage.
	 */
	updateSetting(
		contractAddress: boolean | undefined,
		userFeePercentage: boolean | undefined,
		ownerAddress: any,
		options: any,
		callback?: boolean,
	): any;
	/**
	 * Update energy limit.
	 */
	updateEnergyLimit(
		contractAddress: boolean | undefined,
		originEnergyLimit: boolean | undefined,
		ownerAddress: any,
		options: any,
		callback?: boolean,
	): any;
	checkPermissions(permissions: any, type: any): boolean;
	updateAccountPermissions(
		ownerAddress?: any,
		ownerPermissions?: boolean,
		witnessPermissions?: boolean,
		activesPermissions?: boolean,
		callback?: boolean,
	): any;
	newTxID(transaction: any, callback: any): Promise<any>;
	alterTransaction(
		transaction: any,
		options?: {},
		callback?: boolean,
	): Promise<any>;
	extendExpiration(
		transaction: any,
		extension: any,
		callback?: boolean,
	): Promise<any>;
	addUpdateData(
		transaction: any,
		data: any,
		dataFormat?: string,
		callback?: boolean,
	): Promise<any>;
}
