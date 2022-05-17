import { BaseClient } from '../../BaseClient';
import { FetchOptions, GuildTextChannelData, MessageData, MessageSendData, Snowflake } from '../../../util';
import { GuildChannel } from './GuildChannel';
import { Guild } from './Guild';
import { Message } from './Message';
import { BaseStore } from '../../../stores';

export class GuildTextChannel extends GuildChannel {
	public name: string;
	public position: number;
	public nsfw?: boolean;
	public parentId: Snowflake | null;
	public lastMessageId: Snowflake | null;
	public topic: string | null;
	public lastPinTimestamp: string | null;
	public rateLimitPerUser: number | null;
	public messages: BaseStore<string, Message> | null = new BaseStore<string, Message>();
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
		const response = await this.client.rest.post(`/channels/${this.id}/messages`, data);
		response.guild_id = this.guildId;
		return new Message(this.client, response);
	}

	public async delete(): Promise<GuildChannel> {
		return new GuildChannel(this.client, await this.client.rest.delete(`/channels/${this.id}`), this.guild);
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

	async fetch(id: Snowflake, options: FetchOptions = { cache: true, force: false }) {
		if (options.cache) {
			this.guild.channels.set(
				id,
				new GuildTextChannel(
					this.client,
					await this.client.rest.get(`/guilds/${this.guildId}/channels`),
					this.guild,
				),
			);
		}
		return options.force
			? new GuildTextChannel(
					this.client,
					await this.client.rest.get(`/guilds/${this.guildId}/channels`),
					this.guild,
			  )
			: this.guild.channels.get(id);
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
