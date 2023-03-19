import '@polkadot/api-augment';
import { apiExplorerEndpoint, getPolkadotApi, keyring } from './utils';
import { request } from 'graphql-request';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { type ExtrinsicsData, GET_EXTRINSICS } from './queries';
import BigNumber from 'bignumber.js';
export const extractDataAndSignature = (
	content: string,
): { data: string; signature: string } => {
	const splitContent = content.split('--');
	const data = cleanContent(splitContent[2] || '');
	const signature = cleanContent(splitContent[6] || '');

	if (!data || !signature || data.length === 0 || signature.length === 0) {
		throw new Error('Failed to extract data and signature from message.');
	}

	return { data, signature };
};

const cleanContent = (input: string) => {
	return input.replace(/\n/g, '!@#$%').slice(5, -5);
};

/** Require On-Chain state to be set with a Display Name */
export const verifyOnChainIdentity = async (
	walletAddress: string,
): Promise<{ validOnChainIdentity: boolean; isReasonable: boolean }> => {
	const api = await getPolkadotApi();
	const identity = await api.query.identity.identityOf(walletAddress);
	if (identity.isNone) {
		return { validOnChainIdentity: false, isReasonable: false };
	}
	const humanReadable = identity.value.judgements.toHuman() as [
		string,
		string | 'Reasonable',
	][];
	const isReasonable = humanReadable.some(
		(judgement) => judgement[1] === 'Reasonable',
	);

	if (identity.value.info.display.toString().length === 0) {
		return { validOnChainIdentity: false, isReasonable };
	}
	return { validOnChainIdentity: true, isReasonable };
};

/** Validate Judgement Extrinsic is on chain for our registrarIndex and above our registrarFee */
export const isJudgementRequestSubmitted = async (
	walletAddress: string,
	registrarIndex = 1,
	registrarFee = new BigNumber(20).times('1000000000000'),
): Promise<boolean> => {
	const accountIdHex = u8aToHex(decodeAddress(walletAddress));
	const data = await request<ExtrinsicsData, any>( // FIXME: type ExtrinsicsVariables instead of any
		apiExplorerEndpoint,
		GET_EXTRINSICS,
		{
			accountId: accountIdHex,
		},
	);

	if (data.getExtrinsics.objects.length === 0) return false;

	for (const extrinsic of data.getExtrinsics.objects) {
		const parsedArguments = JSON.parse(extrinsic.callArguments) as [
			{ name: 'reg_index'; type: 'RegistrarIndex'; value: number },
			{ name: 'max_fee'; type: 'BalanceOf'; value: number },
		];
		if (parsedArguments.length !== 2) continue;

		if (
			parsedArguments[0].value === registrarIndex &&
			registrarFee.lte(parsedArguments[1].value)
		) {
			return true;
		}
	}

	return false;
};

export const provideJudgement = async (
	walletAddress: string,
	registrarIndex = 1,
	judgementLevel = 'Reasonable',
	mnemonic = process.env['P3D_REGISTRAR_MNEMONIC'] || '',
): Promise<void> => {
	const api = await getPolkadotApi();
	const pair = keyring.addFromUri(mnemonic);

	// TODO: Change this to an augmented type
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	await (api.tx.identity as any)
		.provideJudgement(registrarIndex, walletAddress, judgementLevel)
		.signAndSend(pair, { nonce: -1 });
};
