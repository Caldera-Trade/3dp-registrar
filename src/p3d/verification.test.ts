import { verifyOnChainIdentity } from './verification';
describe('verifyOnChainIdentity', () => {
	xit('should pass with completed wallet', async () => {
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

	xit('should fail if discord name mismatch', async () => {
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
