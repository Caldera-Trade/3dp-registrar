import { ApiPromise, Keyring, WsProvider } from '@polkadot/api';

const walletMnemonic = process.env['P3D_REGISTRAR_MNEMONIC'] || '';
if (walletMnemonic === '') {
	throw new Error('P3D_REGISTRAR_MNEMONIC is not set.');
}

// RPC API
const apiEndpoint = 'wss://rpc.3dpscan.io';
export const apiExplorerEndpoint = 'https://explorer-api.3dpscan.io/graphql/';
export const ss58Format = 71;

export const keyring = new Keyring({ type: 'sr25519', ss58Format });

export async function getPolkadotApi(): Promise<ApiPromise> {
	const provider = new WsProvider(apiEndpoint, false);
	await provider.connect();
	return ApiPromise.create({ provider, rpc: RPC_CONFIG, types: RPC_TYPES });
}

const RPC_CONFIG = {
	poscan: {
		pushMiningObject: {
			description: 'Submit 3D object for mining.',
			params: [
				{
					name: 'obj_id',
					type: 'u64',
				},
				{
					name: 'obj',
					type: 'String',
				},
			],
			type: 'u64',
		},
		getMiningObject: {
			description: 'Get and unpack 3D object from block.',
			params: [
				{
					name: 'at',
					type: 'BlockHash',
				},
			],
			type: 'String',
		},
	},
};

const RPC_TYPES = {
	AccountInfo: 'AccountInfoWithTripleRefCount',
	Address: 'AccountId',
	LookupSource: 'AccountId',
	Keys: 'SessionKeys2',
	Weight: 'u32',
	Difficulty: 'u256',
	DifficultyAndTimestamp: {
		difficulty: 'Difficulty',
		timestamp: 'u64',
	},
	LockParameters: {
		period: 'u16',
		divide: 'u16',
	},
	StorageVersion: {
		_enum: ['V0', 'V1'],
		V0: 'u8',
		V1: 'u8',
	},
};
