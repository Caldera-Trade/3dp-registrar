import type BigNumber from 'bignumber.js';

export type WalletType =
	| 'Hierarchical Deterministic'
	| 'Single Signature'
	| 'Multi Signature'
	| 'sr25519'
	| 'CAT';

export interface NewWalletResponse {
	walletAddress: string;
	walletMnemonic: string;
	walletType: WalletType;
	walletBalance?: BigNumber;
	parentBalance?: BigNumber;
}
export interface CoinImplementation {
	/**
	 * Retrieves New Wallet Information
	 *
	 * @remarks
	 * This method retrieves fresh wallet information from a coin.
	 *
	 *
	 * walletAddress is used to indicate what address to store a fresh list of transactions to be verified.
	 *
	 * walletMnemonic is used to re-instantiate a new Wallet with the existing state that this command initializes.
	 *
	 * If Address Derivation is provided by an HD Wallet (e.g. BTC), a single Mnemonic may be shared across all walletAddresses this function creates.
	 *
	 * Otherwise, a new Mnemonic should be created every time.
	 *
	 *
	 * This information is then returned for later use in:
	 * {@link getWallet | CoinImpementation.getWallet}
	 *
	 * {@link transferFunds  | CoinImpementation.transferFunds}
	 *
	 * @param allowReuse - Allow previously used wallets to be selected
	 * @param hdWalletSkipNumber - Number of active trades to enable custom 'smart' derivation on HD Wallets
	 * @returns Wallet Mnemonic Object
	 *
	 * @privateremarks
	 * Parameter 'hdWalletSkipNumber' may be deprecated in the future by a MongoDB reader that verifies that the walletAddress is not currently in use
	 *
	 * @alpha
	 */
	newWallet: (
		allowReuse?: boolean,
		hdWalletSkipNumber?: number,
	) => Promise<NewWalletResponse>;

	/** Retrieves Wallet Balance
	 *
	 * If walletAddress was provided by an HD Wallet (e.g. BTC), the response must be the exact balance of the individual address.
	 *
	 * Otherwise, you may return the balance of the whole wallet.
	 *
	 * @remarks
	 * This method is part of the {@link CoinImplementation | CoinImplementation system}.
	 *
	 * @returns Wallet Balance Object
	 *
	 * @alpha
	 */
	getWallet: (
		walletAddress: string,
		walletMnemonic: string,
	) => Promise<{
		balance: BigNumber;
		walletType: WalletType;
	}>;

	/** Transfers Funds
	 *
	 * If Address was provided by an HD Wallet (e.g. BTC), you must send funds using the specific UTXOs that were received.
	 *
	 * @remarks
	 * Transaction Fees should be taken out of the wallet, not out of the sendAmount.
	 *
	 * This method is part of the {@link CoinImplementation | CoinImplementation system}.
	 *
	 * @returns Transaction Object
	 *
	 * @alpha
	 */
	transferFunds: (
		sendAmount: BigNumber,
		sendFromAddress: string,
		sendFromWalletMnemonic: string,
		sendToAddress: string,
		isRefund: boolean,
	) => Promise<{
		transactionId: string;
		status: 'sent';
	}>;

	/** Validates Transaction Status
	 *
	 * Get transaction status.
	 *
	 * @remarks
	 * Confirmed: >= 1 confirmations.
	 *
	 * Pending: In Mempool, or 0 confirmations.
	 *
	 * Failed: Failed to send, we must {@link transferFunds  | CoinImpementation.transferFunds} again.
	 *
	 * @returns Transaction Object
	 *
	 * @alpha
	 */
	getTransaction: (
		transactionId: string,
		walletMnemonic: string,
	) => Promise<{
		transactionId: string;
		status: 'confirmed' | 'pending' | 'failed';
		fee: BigNumber;
		amount: BigNumber;
	}>;

	/** Estimated TX Fee
	 *
	 * @remarks
	 * Used to provide UI clarity to the user that the transaction fee is high, so there may be a delay.
	 *
	 * @returns Fee Amount Object
	 *
	 * @alpha
	 */
	getTransactionFee: (txSize?: number) => Promise<{
		feeAmount: BigNumber;
	}>;

	/** Validates Wallet Address
	 *
	 * Can be Regex or an API call. Feel free to use //eslint-ignore to bypass async requirements if necessary.
	 *
	 * @remarks
	 * Used to validate the Payee's wallet is of the right type.
	 *
	 * @returns Valid Status Object
	 *
	 * @alpha
	 */
	validateWallet: (walletAddress: string) => Promise<{
		valid: boolean;
	}>;
}
