import { GuildChannel } from './GuildChannel';
import { BaseClient } from '../../BaseClient';

export class GuildVoiceChannel extends GuildChannel {
	constructor(client: BaseClient, data: any) {
		super(client, data);
	}
}
