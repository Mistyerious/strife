import { BaseStore } from './BaseStore';
import { BaseClient } from '../client/BaseClient';
import { Guild } from '../client/rest';

export class GuildStore extends BaseStore<string, Guild> {
	private client: BaseClient;
	constructor(client: BaseClient) {
		super();

		this.client = client;
	}

	public insert(guild: any) {
		if (this.client.options.cacheEnabled && this.client.options.cache.guild) {
			this.set(guild.id, guild);
		}
	}
}
