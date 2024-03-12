import { Events, MessageType } from 'discord.js';
import { validateMessageSignature } from '../p3d/discord-responses.js';
import { discordClient } from './client.js';

const monitoringChannels = new Set([
	// '1085692832838324254',
	'1078937364665217126',
]);
discordClient.on(Events.MessageUpdate, async (message) => {
	if (
		message.type === MessageType.Reply ||
		!message.content ||
		!monitoringChannels.has(message.channel.id)
	) {
		return;
	}
	await validateMessageSignature(message, message.content, 1).catch(() => {
		// Ignore errors
	});
});

discordClient.on(Events.MessageCreate, async (message) => {
	if (
		message.type === MessageType.Reply ||
		!message.content ||
		!monitoringChannels.has(message.channel.id)
	) {
		return;
	}
	await validateMessageSignature(message, message.content, 1).catch(() => {
		// Ignore errors
	});
});
