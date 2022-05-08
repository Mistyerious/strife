import { ChannelData, MessageCreateData, PermissionOverwrites } from '../../../util';
import { BaseClient } from '../../BaseClient';
import { ChannelType, RESTPostAPIGuildChannelJSONBody, RESTPostAPIGuildChannelResult } from 'discord-api-types/v9';
import { Message } from './Message';

export class Channel {
	public client: BaseClient;
	public id: string;
	public type: ChannelType;
	public guildId: string;
	public position?: number | null;
	public permissionOverwrites?: Array<PermissionOverwrites> = [];
	public name: string;
	public topic: string;
	public parent: string;
	constructor(client: BaseClient, data: ChannelData) {
		this.client = client;
		this.id = data.id;
		this.type = data.type;
		this.guildId = data.guild_id;
		this.position = data.position;
		this.permissionOverwrites = data.permission_overwrites;
		this.name = data.name;
		this.topic = data.topic;
		this.parent = data.parent;
	}

	public async send(data: MessageCreateData): Promise<Message> {
		return await this.client.rest.post(`/channels/${this.id}/messages`, data);
	}

	public async create(
		guildId: string,
		data: RESTPostAPIGuildChannelJSONBody,
	): Promise<RESTPostAPIGuildChannelResult> {
		return await this.client.rest.post(`/guilds/${guildId}/channels`, data);
	}
}
