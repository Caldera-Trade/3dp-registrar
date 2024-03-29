import '@polkadot/api-augment';
import { apiExplorerEndpoint, getPolkadotApi, keyring } from './utils.js';
import { request } from 'graphql-request';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { type ExtrinsicsData, GET_EXTRINSICS } from './queries.js';
import BigNumber from 'bignumber.js';
import TronWeb from 'tronweb';
export const extractDataSignatureWallet = (
	content: string,
): { data: string; signature: string; wallet: string } => {
	const data = content.match(
		/start message --\n([\S\s]*)\n-- end message --/i,
	);
	const signature = content.match(
		/start p3d wallet signature --\n([\S\s]*)\n-- end p3d wallet signature --/i,
	);
	const wallet = content.match(
		/start public key --\n([\S\s]*)\n-- end public key --/i,
	);
	if (
		!wallet ||
		!wallet[1] ||
		wallet[1].length === 0 ||
		!signature ||
		!signature[1] ||
		signature[1].length === 0 ||
		!data ||
		!data[1] ||
		data[1].length === 0
	) {
		throw new Error('Failed to extract data and signature from message.');
	}

	return { data: data[1], signature: signature[1], wallet: wallet[1] };
};

/** Require On-Chain state to be set with a Display Name */
export const verifyOnChainIdentity = async (
	walletAddress: string,
	discordTag: string,
): Promise<{
	hasOnChainIdentity: boolean;
	isReasonable: boolean;
	discordMatches: boolean;
}> => {
	let hasOnChainIdentity = false;
	let discordMatches = false;
	let isReasonable = false;

	const api = await getPolkadotApi();
	const identity = await api.query.identity.identityOf(walletAddress);
	const humanIdentity = identity.toHuman()as {
		judgements:[
			string,
			string | 'Reasonable',
		][],
		deposit: string,
		info: {
		  additional: [
			{ Raw: string | 'Discord' },
			{ Raw: string },
		][],
		  display: { Raw: string },
		  legal: { Raw: string },
		  web: { Raw: string },
		  riot: 'None',
		  email: { Raw: string },
		  pgpFingerprint: null,
		  image: 'None',
		  twitter: { Raw: string }
		}
	  };
	if (
		identity.isNone || (humanIdentity.info.display.Raw === "" || humanIdentity.info.display.Raw === "None")
	) {
		return {
			hasOnChainIdentity,
			isReasonable,
			discordMatches,
		};
	}
	hasOnChainIdentity = true;

	/** Validate Discord Tag Matches Users, and is somewhere in the message */
	const additionalIdentities = humanIdentity.info.additional;

	if (!additionalIdentities[0])
		return { hasOnChainIdentity, isReasonable, discordMatches };

	// Convert discordTag string into a hex string
	const discordTagHex = TronWeb.toHex(discordTag) as string;

	console.log(additionalIdentities);
	discordMatches = additionalIdentities.some(
		(x) =>
			x[0].Raw === 'Discord' &&
			(x[1].Raw === discordTag || x[1].Raw === discordTagHex),
	);

	/** Validate Reasonably Judged at least once */
	isReasonable = humanIdentity.judgements.some(
		(judgement) => judgement[1] === 'Reasonable',
	);

	return { hasOnChainIdentity, isReasonable, discordMatches };
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
	mnemonic: string,
	registrarIndex = 1,
	judgementLevel = 'Reasonable',
): Promise<void> => {
	const api = await getPolkadotApi();
	const pair = keyring.addFromUri(mnemonic);

	// TODO: Change this to an augmented type
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	await (api.tx.identity as any)
		.provideJudgement(registrarIndex, walletAddress, judgementLevel)
		.signAndSend(pair, { nonce: -1 });
};
