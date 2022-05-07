import { BaseClient } from './client/BaseClient';
import { ActivityTypes, Intents } from './util';
import { TOKEN } from './config';
import { ChannelType } from 'discord-api-types/v9';
import { Message } from './client/rest';

const client = new BaseClient(TOKEN, {
	intents: [Intents.GUILD_MESSAGES],
	presence: {
		status: 'dnd',
		activities: [
			{
				type: ActivityTypes.Watching,
				name: 'Your mom',
			},
		],
	},
});

client.on('debug', console.log);
client.on('ready', console.log);
client.on('messageCreate', async (message: Message) => {
	if (message.author.bot) return;
	console.log(await message.send('972334766399582218', { content: 'Hello World' }));
});
client.login();
