import { BaseClient } from '../../BaseClient';
import { MessageAuthor, MessageData, MessageEditOptions, MessageFetchOptions, Snowflake } from '../../../util';
import { GuildTextChannel } from './GuildTextChannel';
import { Guild } from './Guild';

export class Message {
	public id: string;
	public content: string;
	public client?: BaseClient;
	public author: MessageAuthor;
	public embeds = [];
	public mentions = [];
	public pinned: boolean;
	public mentionEveryone: boolean;
	public tts: boolean;
	public timestamp: string;
	public editedTimestamp: string;
	public flags: number;
	public components = [];
	public type: number;
	public channelId: string;
	public mentionRoles = [];
	public mentionChannels = [];
	public channel: GuildTextChannel;
	public guildId?: string;
	public guild?: Guild;
	constructor(client: BaseClient, data: MessageData) {
		this.client = client;
		this.id = data.id;
		this.content = data.content;
		this.author = data.author;
		this.embeds = data.embeds;
		this.mentionEveryone = data.mention_everyone;
		this.mentions = data.mentions;
		this.pinned = data.pinned;
		this.tts = data.tts;
		this.timestamp = data.timestamp;
		this.editedTimestamp = data.edited_timestamp;
		this.flags = data.flags;
		this.components = data.components;
		this.channelId = data.channel_id;
		this.mentionChannels = data.mention_channels;
		this.mentionRoles = data.mention_roles;
		this.type = data.type;
		this.guildId = data.guild_id;
		this.guild = this.client.guilds.get(this.guildId);
		this.channel = this.guild.channels.get(this.channelId) as GuildTextChannel;
	}

	async edit(options: MessageEditOptions): Promise<this> {
		return this._parse(this.client.rest.patch(`/channels/${this.channelId}/messages/${this.id}`, options));
	}

	async fetch(id: Snowflake, options: MessageFetchOptions = { cache: true, force: false }) {
		if (!this.channel) throw new Error('CHANNEL_NOT_CACHED');
		if (options.cache) {
			let response = this._parse(await this.client.rest.get(`/channels/${this.channelId}/messages/${id}`));
			this.channel.messages.set(id, response);
		}
		return options.force
			? this._parse(await this.client.rest.get(`/channels/${this.channelId}/messages/${id}`))
			: this.channel.messages.get(id);
	}

	private _parse(data: any): this {
		this.id = data.id;
		this.content = data.content;
		this.embeds = data.embeds;
		this.channelId = data.channelId;
		this.channel = data.channel;
		this.mentions = data.mentions;
		this.mentionRoles = data.mentionRoles;
		this.mentionEveryone = data.mentionEveryone;
		this.tts = data.tts;
		this.mentionChannels = data.mentionChannels;
		this.components = data.components;
		this.flags = data.flags;
		this.editedTimestamp = data.editedTimestamp;
		this.timestamp = data.timestamp;

		return this;
	}
}
