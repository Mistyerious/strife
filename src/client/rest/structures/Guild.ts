import { BaseClient } from '../../BaseClient';
import { GuildData } from '../../../util';
import { BaseStore } from '../../../stores';
import { Channel } from './Channel';

export class Guild {
	public client: BaseClient;
	public channels = new BaseStore<string, Channel>();
	public id: string;
	constructor(client: BaseClient, data: GuildData) {
		this.id = data.id;
		this.client = client;

		if (client.options.cache.channels) {
			for (const rawChannel of data.channels.values()) {
				const channel = new Channel(client, rawChannel, this);
				this.channels.set(channel.id, channel);
			}
		}
	}
}
