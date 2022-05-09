import { BaseClient } from '../../BaseClient';
import { MessageAuthor, MessageData } from '../../../util';
import { GuildTextChannel } from './GuildTextChannel';
import { Guild } from './Guild';

export class Message {
	public id: string;
	public content: string;
	public client: BaseClient;
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
}
