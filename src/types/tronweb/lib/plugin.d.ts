export default class Plugin {
	constructor(tronWeb?: boolean, options?: {});
	register(
		Plugin: any,
		options: any,
	): {
		libs: never[];
		plugged: never[];
		skipped: never[];
	};
}
