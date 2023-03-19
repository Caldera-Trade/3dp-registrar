export declare const TRON_MESSAGE_PREFIX = '\u0019TRON Signed Message:\n';
export declare function hashMessage(message: any): any;
export declare function signMessage(message: any, privateKey: any): any;
export declare function verifyMessage(message: any, signature: any): string;
