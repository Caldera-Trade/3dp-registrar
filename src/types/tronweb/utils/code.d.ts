import {
	byte2hexStr,
	bytesToString,
	hextoString,
	byteArray2hexStr,
	base64DecodeFromString,
	base64EncodeToString,
} from './bytes';
export declare function bin2String(array: any): string;
export declare function arrayEquals(
	array1: any,
	array2: any,
	strict: any,
): boolean;
export declare function stringToBytes(str: any): any[];
export {
	byte2hexStr,
	bytesToString,
	hextoString,
	byteArray2hexStr,
	base64DecodeFromString,
	base64EncodeToString,
};
export declare function hexChar2byte(c: any): number;
export declare function isHexChar(c: any): 0 | 1;
export declare function hexStr2byteArray(str: any, strict?: boolean): any[];
export declare function strToDate(str: any): Date;
export declare function isNumber(c: any): 0 | 1;
export declare function getStringType(str: any): 2 | 3 | 1 | -1;
