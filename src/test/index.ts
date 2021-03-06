import { BaseClient, Message } from '../';
import { ActivityTypes, Intents } from '../';
import { TOKEN } from '../config';

const client = new BaseClient(TOKEN, {
	intents: [Intents.GUILD_MESSAGES, Intents.GUILDS],
	presence: {
		status: 'dnd',
		afk: false,
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
		case '!changeName': {
			console.log(message.channel);
		}
	}
});
client.on('channelUpdate', console.log);
client.login();
