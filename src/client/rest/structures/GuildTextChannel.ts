import { BaseClient } from '../../BaseClient';
import { GuildTextChannelData, MessageSendData, Snowflake } from '../../../util';
import { GuildChannel } from './GuildChannel';
import { Guild } from './Guild';
import { Message } from './Message';

export class GuildTextChannel extends GuildChannel {
	public name: string;
	public position: number;
	public nsfw?: boolean;
	public parentId: Snowflake;
	public lastMessageId?: Snowflake;
	public topic?: string;
	public lastPinTimestamp?: string;
	public rateLimitPerUser?: number;
	constructor(client: BaseClient, data: GuildTextChannelData, guild: Guild) {
		super(client, data, guild);

		this.name = data.name;
		this.position = data.position;
		this.nsfw = data.nsfw;
		this.parentId = data.parent_id;
		this.lastMessageId = data.last_message_id;
		this.topic = data.topic;
		this.lastPinTimestamp = data.last_pin_timestamp;
		this.rateLimitPerUser = data.rate_limit_per_user;
	}

	public async send(data: MessageSendData): Promise<Message> {
		return this.client.rest.post(`/channels/${this.id}/messages`, data);
	}

	public async clone(): Promise<this> {
		return this.client.rest.post(`/guilds/${this.guildId}/channels`, {
			name: this.name,
			position: this.position,
			nsfw: this.nsfw,
			rateLimitPerUser: this.rateLimitPerUser,
			topic: this.topic,
			parent: this.parentId,
		});
	}

	public async setName(newName: string): Promise<this> {
		return this.client.rest.patch(`/channels/${this.id}`, { name: newName });
	}
}
