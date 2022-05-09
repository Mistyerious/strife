import { BaseClient } from '../../BaseClient';
import { GuildTextChannelData, Snowflake } from '../../../util';
import { GuildChannel } from './GuildChannel';

export class GuildTextChannel extends GuildChannel {
	public name: string;
	public position: number;
	public nsfw?: boolean;
	public parentId: Snowflake;
	public lastMessageId?: Snowflake;
	public topic?: string;
	public lastPinTimestamp?: string;
	public rateLimitPerUser?: number;
	constructor(client: BaseClient, data: GuildTextChannelData) {
		super(client, data);

		this.name = data.name;
		this.position = data.position;
		this.nsfw = data.nsfw;
		this.parentId = data.parent_id;
		this.lastMessageId = data.last_message_id;
		this.topic = data.topic;
		this.lastPinTimestamp = data.last_pin_timestamp;
		this.rateLimitPerUser = data.rate_limit_per_user;
	}
}
