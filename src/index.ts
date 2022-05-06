import { BaseClient } from './client/BaseClient';
import { ActivityTypes } from './util';
import { TOKEN } from './config';

const client = new BaseClient({
	token: TOKEN,
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
client.login();
client.ws.shards.get('1').on('debug', console.log);
