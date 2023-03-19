import { utils, Wallet as ethersWallet } from 'ethers';
declare const keccak256: typeof utils.keccak256;
declare const sha256: typeof utils.sha256;
declare const toUtf8Bytes: typeof utils.toUtf8Bytes;
declare const toUtf8String: typeof utils.toUtf8String;
declare const recoverAddress: typeof utils.recoverAddress;
declare const SigningKey: typeof utils.SigningKey;
declare const AbiCoder: typeof utils.AbiCoder;
declare const Interface: typeof utils.Interface;
declare const FormatTypes: {
	[name: string]: string;
};
declare const arrayify: typeof utils.arrayify;
declare const splitSignature: typeof utils.splitSignature;
declare const joinSignature: typeof utils.joinSignature;
declare const concat: typeof utils.concat;
declare const id: typeof utils.id;
declare const isValidMnemonic: typeof utils.isValidMnemonic;
export {
	keccak256,
	sha256,
	toUtf8Bytes,
	toUtf8String,
	recoverAddress,
	SigningKey,
	AbiCoder,
	Interface,
	FormatTypes,
	splitSignature,
	joinSignature,
	arrayify,
	ethersWallet,
	concat,
	id,
	isValidMnemonic,
};
