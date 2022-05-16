import { BaseClient } from '../../BaseClient';
import { GuildTextChannelData, MessageData, MessageSendData, Snowflake } from '../../../util';
import { GuildChannel } from './GuildChannel';
import { Guild } from './Guild';
import { Message } from './Message';
import { BaseStore } from '../../../stores';

export class GuildTextChannel extends GuildChannel {
	public name: string;
	public position: number;
	public nsfw?: boolean;
	public parentId: Snowflake;
	public lastMessageId?: Snowflake;
	public topic?: string;
	public lastPinTimestamp?: string;
	public rateLimitPerUser?: number;
	public messages?: BaseStore<string, Message> = new BaseStore<string, Message>();
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

		// Gotta come up with a better way to do this......
		(async () => {
			for (const message of await this.client.rest.get(`/channels/${this.id}/messages`)) {
				this.messages.set(message.id, message);
			}
		})();
	}

	public async send(data: MessageSendData): Promise<Message> {
		const response = await this.client.rest.post(`/channels/${this.id}/messages`, data);
		response.guild_id = this.guildId;
		return new Message(this.client, response);
	}

	public async clone(): Promise<this> {
		return this._parse(
			this.client.rest.post(`/guilds/${this.guildId}/channels`, {
				name: this.name,
				position: this.position,
				nsfw: this.nsfw,
				rateLimitPerUser: this.rateLimitPerUser,
				topic: this.topic,
				parent: this.parentId,
			}),
		);
	}

	public async setName(newName: string): Promise<this> {
		return this.client.rest.patch(`/channels/${this.id}`, { name: newName });
	}

	private _parse(data: any): this {
		this.name = data.name;
		this.position = data.position;
		this.nsfw = data.nsfw;
		this.rateLimitPerUser = data.rateLimitPerUser;
		this.topic = data.topic;
		this.parentId = data.parentId;
		this.lastMessageId = data.lastMessageId;
		this.type = data.type;

		return this;
	}
}
