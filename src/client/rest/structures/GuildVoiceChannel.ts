import { GuildChannel } from './GuildChannel';
import { BaseClient } from '../../BaseClient';
import { GuildVoiceChannelData, PermissionOverwrites, VideoQualityMode } from '../../../util';
import { Guild } from './Guild';

export class GuildVoiceChannel extends GuildChannel {
	public name: string;
	public position: number;
	permissionOverwrites: Array<PermissionOverwrites>;
	parentId: string;
	bitrate?: number;
	userLimit: number;
	rtcRegion: string;
	videoQualityMode: VideoQualityMode;
	public guildId: string;
	constructor(client: BaseClient, data: GuildVoiceChannelData, guild: Guild) {
		super(client, data, guild);
		this.name = data.name;
		this.position = data.position;
		this.permissionOverwrites = data.permission_overwrites;
		this.parentId = data.parent_id;
		this.bitrate = data.bitrate;
		this.userLimit = data.user_limit;
		this.rtcRegion = data.rtc_region;
		this.videoQualityMode = data.video_quality_mode;
		this.guildId = guild ? guild.id : data.guild_id;
		this.guild = guild ?? this.client.guilds.get(this.guildId);
	}
}
