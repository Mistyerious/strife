import { BaseClient } from './client/BaseClient';
import { ActivityTypes } from './util';
import { TOKEN } from './config';
import { ChannelType } from 'discord-api-types/v9';

const client = new BaseClient(TOKEN, {
	intents: 0,
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
(async () => {
	console.log(
		await client.rest.createChannel('957867801119449109', {
			name: 'DickAndBalls',
			type: ChannelType.GuildText,
		}),
	);
})();
client.login();
