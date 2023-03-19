declare const txJsonToPb: (transaction: any) => any;
declare const txJsonToPbWithArgs: (
	transaction: any,
	args?: {},
	options?: {},
) => any;
declare const txCheck: (transaction: any) => boolean;
declare const txCheckWithArgs: (
	transaction: any,
	args: any,
	options: any,
) => boolean;
declare const txPbToTxID: (transactionPb: any) => string;
export { txJsonToPb, txPbToTxID, txJsonToPbWithArgs, txCheckWithArgs, txCheck };
