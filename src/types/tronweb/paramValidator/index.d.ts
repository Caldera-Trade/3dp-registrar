export default class Validator {
	constructor(tronWeb?: boolean);
	invalid(param: any): any;
	notPositive(param: any): string;
	notEqual(param: any): any;
	notValid(params?: never[], callback?: Function): boolean | undefined;
}
