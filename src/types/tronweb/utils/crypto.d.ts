export declare function getBase58CheckAddress(addressBytes: any): string;
export declare function decodeBase58Address(base58Sting: any): false | number[];
export declare function signTransaction(
	priKeyBytes: any,
	transaction: any,
): any;
export declare function arrayToBase64String(a: any): string;
export declare function signBytes(privateKey: any, contents: any): string;
export declare function _signTypedData(
	domain: any,
	types: any,
	value: any,
	privateKey: any,
): string;
export declare function getRowBytesFromTransactionBase64(base64Data: any): any;
export declare function genPriKey(): any[];
export declare function computeAddress(pubBytes: any): any[];
export declare function getAddressFromPriKey(priKeyBytes: any): any[];
export declare function decode58Check(addressStr: any): false | number[];
export declare function isAddressValid(base58Str: any): boolean;
export declare function getBase58CheckAddressFromPriKeyBase64String(
	priKeyBase64String: any,
): string;
export declare function getHexStrAddressFromPriKeyBase64String(
	priKeyBase64String: any,
): string;
export declare function getAddressFromPriKeyBase64String(
	priKeyBase64String: any,
): any;
export declare function getPubKeyFromPriKey(priKeyBytes: any): any[];
export declare function ECKeySign(hashBytes: any, priKeyBytes: any): string;
export declare function SHA256(msgBytes: any): any[];
export declare function passwordToAddress(password: any): string;
export declare function pkToAddress(privateKey: any, strict?: boolean): string;
