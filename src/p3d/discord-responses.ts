import { stringToU8a } from '@polkadot/util';
import { signatureVerify } from '@polkadot/util-crypto';
import { AttachmentBuilder, Message, PartialMessage } from 'discord.js';
import { requestJudgementImage } from './assets/request-judgement';
import {
	extractDataSignatureWallet,
	isJudgementRequestSubmitted,
	provideJudgement,
	verifyOnChainIdentity,
} from './verification';
import TronWeb from 'tronweb';
import BigNumber from 'bignumber.js';

export const validateMessageSignature = async (
	message: Message | PartialMessage,
	content: string,
	registrarIndex: number,
	registrarFee = new BigNumber(20).times('1000000000000'),
	mnemonic = process.env['P3D_REGISTRAR_MNEMONIC'] || '',
): Promise<void> => {
	try {
		/** Extract Data From Message
		 * Differentiate data positions based on channel
		 */
		const {
			data: discordTag,
			signature,
			wallet,
		} = extractDataSignatureWallet(content);
		/** Validate Discord Tag Matches Users, and is somewhere in the message */
		if (!message.member?.user.tag) {
			throw new Error('Failed to extract discord tag from member.');
		}
		if (
			!discordTag
				.replaceAll(' ', '')
				.includes(message.member.user.tag.replaceAll(' ', ''))
		) {
			return discordErrorReply(
				message,
				`Discord tag ${message.member.user.tag} cannot be found in your message.`,
			);
		}

		/** Validate Tron Address TODO: Re-enable on next funding round with structure */
		// if (trxAddress !== '' && !TronWeb.isAddress(trxAddress)) {
		// 	return discordErrorReply(
		// 		message,
		// 		`TRX Wallet Address \`${trxAddress}\` is not valid.\n<https://tronscan.org/#/address/${trxAddress}>`,
		// 	);
		// }

		/** Validate Signature Matches Data Provided */
		const signatureData = stringToU8a(discordTag.replaceAll('!@#$%', ' '));
		const { isValid } = signatureVerify(signatureData, signature, wallet);
		if (!isValid) {
			return discordErrorReply(
				message,
				[
					`Signature does not match provided data, please try again.`,
					`Please ensure all of the content inbetween \`-- Start Message --\` and \`-- End Message --\` is included in the signature.`,
					``,
					`Beware of extra spaces in your discord message or your signature data!`,
				].join('\n'),
				90_000,
			);
		}

		/** Validate On-Chain-Identity */
		const { isReasonable, discordMatches, hasOnChainIdentity } =
			await verifyOnChainIdentity(wallet, message.member.user.tag);
		if (!hasOnChainIdentity) {
			return discordErrorReply(
				message,
				[
					`On-chain identity is invalid, please set up on-chain identity here: https://polkadot.js.org/apps/#/accounts`,
					``,
					`After your account is added, click the three dots next to your account and select "Set on-chain identity".`,
					`Once the identity is accepted by the chain, please try again.`,
				].join('\n'),
				90_000,
			);
		}

		if (!discordMatches) {
			return discordErrorReply(
				message,
				[
					`On-chain identity is invalid, ${message.member.user.tag} was not found in the \`discord\` Identity.`,
					`Please update your on-chain identity's \`discord\` information here: https://polkadot.js.org/apps/#/accounts`,
					``,
					`Once the identity update is accepted by the chain, please try again.`,
				].join('\n'),
				90_000,
			);
		}

		/** Validate Reasonable Judgement */
		if (!isReasonable) {
			const judgmentRequestSubmitted = await isJudgementRequestSubmitted(
				wallet,
				registrarIndex,
				registrarFee,
			);

			if (!judgmentRequestSubmitted) {
				const imageAttachment = new AttachmentBuilder(
					Buffer.from(requestJudgementImage, 'base64'),
					{
						name: 'requestJudgement.png',
					},
				);

				return discordErrorReply(
					message,
					[
						`Judgement extrinsic is not on blockchain, please submit a request for judgement and wait for it to be accepted: <https://polkadot.js.org/apps/#/extrinsics>`,
						``,
						`**After your request is accepted, please resend your message.**`,
					].join('\n'),
					180_000,
					[imageAttachment],
				);
			} else {
				await provideJudgement(wallet, mnemonic, registrarIndex);
				return discordSuccessReply(
					message,
					[
						`Successfully Validated! 'Reasonable' judgement is actively being applied.`,
						`In a few blocks, you should see your identity here: <https://explorer.3dpass.org/account/${wallet}>`,
					].join('\n'),
					60_000,
				);
			}
		}

		return discordSuccessReply(message, `Successfully Validated!`, 15_000);
	} catch (error) {
		console.error(error);
	}
};

const discordErrorReply = async (
	message: Message | PartialMessage,
	content: string,
	timeoutDuration = 30_000,
	// eslint-disable-next-line unicorn/no-null
	files: any[] = [],
) => {
	await message.react('❌');
	await message
		.reply({ content, files })
		.then((response) =>
			setTimeout(() => void response.delete(), timeoutDuration),
		);
};

const discordSuccessReply = async (
	message: Message | PartialMessage,
	content: string,
	timeoutDuration = 30_000,
	// eslint-disable-next-line unicorn/no-null
	files: any[] = [],
) => {
	await message.react('✅');
	await message
		.reply({ content, files })
		.then((response) =>
			setTimeout(() => void response.delete(), timeoutDuration),
		);
};
