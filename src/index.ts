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
		guild: { limit: 100 },
		channels: { limit: 50 },
	},
});

client.on('debug', console.log);
client.on('ready', () => console.log(`Client has logged in`));
client.on('messageCreate', async (message: Message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith('!')) return;

	switch (message.content) {
		case '!hello': {
			console.log(client.guilds);
			console.log(client.guilds.get('957867801119449109'));
			return console.log(await message.channel.send({ content: 'hello' }));
		}
	}
});
client.on('channelUpdate', console.log);
client.login();
