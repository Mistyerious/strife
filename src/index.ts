import { BaseClient } from './client/BaseClient';
import { ActivityTypes, Intents } from './util';
import { TOKEN } from './config';
import { Message } from './client/rest';

const client = new BaseClient(TOKEN, {
	intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
	presence: {
		status: 'dnd',
		activities: [
			{
				type: ActivityTypes.Watching,
				name: 'Your mom',
			},
		],
	},
	cache: {
		guild: true,
		channels: true,
	},
});

client.on('debug', console.log);
client.on('ready', () => console.log(`Client has logged in`));
client.on('messageCreate', async (message: Message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith('!')) return;

	console.log(message.content);
	switch (message.content) {
		case '!hello': {
			console.log(message.channel);
			return console.log(await message.channel.send({ content: 'Hello there!' }));
		}
	}
});
client.login();
