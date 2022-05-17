import { Channel } from './Channel';
import { BaseClient } from '../../BaseClient';
import { Guild } from './Guild';
import { GuildChannelData, Snowflake } from '../../../util';

export class GuildChannel extends Channel {
	public guild: Guild;
	public guildId: Snowflake;
	constructor(client: BaseClient, data: GuildChannelData, guild: Guild) {
		super(client, data);
		this.guildId = guild ? guild.id : data.guild_id;
		this.guild = guild ?? this.client.guilds.get(this.guildId);
	}
}
