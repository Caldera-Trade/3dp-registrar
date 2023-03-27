import {
	verifyOnChainIdentity,
	extractDataSignatureWallet,
} from './verification';

describe('extractDataAndSignature', () => {
	it('should extract data and signature', () => {
		const input =
			'-- Start message --\ntest 1234 asd Zxcv LMNOP\n-- End message --\n\n-- Start P3D wallet signature --\n0x2a97a14d51117297445282883cfc59156de04349025f635dde40e584fc72fb2c548c668ad71da9b6dff29988ee90fa09ba6c3a6dec9bf6751d751c99a3846c8f\n-- End P3D wallet signature --\n\n-- Start public key --\nd1H22L4nKvmmBJPvKrMetUAjx6gbWindCTiMQTinatbNs9VDN\n-- End public key --';

		const result = extractDataSignatureWallet(input);
		expect(result).toEqual({
			data: 'test 1234 asd Zxcv LMNOP',
			signature:
				'0x2a97a14d51117297445282883cfc59156de04349025f635dde40e584fc72fb2c548c668ad71da9b6dff29988ee90fa09ba6c3a6dec9bf6751d751c99a3846c8f',
			wallet: 'd1H22L4nKvmmBJPvKrMetUAjx6gbWindCTiMQTinatbNs9VDN',
		});
	});
});

describe('verifyOnChainIdentity', () => {
	it('should pass with completed wallet', async () => {
		const result = await verifyOnChainIdentity(
			'd1J1WymQy1aVqstxWdY7wE6V1RNFtHkK68g3KKW1Sc3rUmBVF',
			'Chandler#9999',
		);
		expect(result).toEqual({
			hasOnChainIdentity: true,
			isReasonable: true,
			discordMatches: true,
		});
	});

	it('should pass with completed wallet with foreign characters', async () => {
		const result = await verifyOnChainIdentity(
			'd1H22L4nKvmmBJPvKrMetUAjx6gbWindCTiMQTinatbNs9VDN',
			'Алексей1977#7034',
		);
		expect(result).toEqual({
			hasOnChainIdentity: true,
			isReasonable: false,
			discordMatches: true,
		});
	});

	it('should fail if discord name mismatch', async () => {
		const result = await verifyOnChainIdentity(
			'd1J1WymQy1aVqstxWdY7wE6V1RNFtHkK68g3KKW1Sc3rUmBVF',
			'Bob#1234',
		);
		expect(result).toEqual({
			hasOnChainIdentity: true,
			isReasonable: true,
			discordMatches: false,
		});
	});
});
