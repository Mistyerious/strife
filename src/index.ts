import { BaseClient } from './client/BaseClient';
import { ActivityTypes, Intents } from './util';
import { TOKEN } from './config';
import { Guild, Message } from './client/rest';

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
	// console.log(message);
	console.log(client.channels.values());
	// console.log(client.guilds);
});
// client.on('guildCreate', (guild: Guild) => console.log(guild.id));
client.login();
