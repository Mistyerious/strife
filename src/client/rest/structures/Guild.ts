import { BaseClient } from '../../BaseClient';
import { ChannelTypes, GuildChannels, GuildData } from '../../../util';
import { BaseStore } from '../../../stores';
import { GuildTextChannel } from './GuildTextChannel';
import { GuildVoiceChannel } from './GuildVoiceChannel';

export class Guild {
	public client: BaseClient;
	public channels = new BaseStore<string, GuildChannels>();
	public id: string;
	constructor(client: BaseClient, data: GuildData) {
		this.id = data.id;
		this.client = client;

		if (client.options.cache.channels) {
			for (const rawChannel of data.channels.values()) {
				switch (rawChannel.type) {
					case ChannelTypes.GUILD_TEXT: {
						const textChannel = new GuildTextChannel(this.client, rawChannel as GuildTextChannel, this);
						this.channels.set(textChannel.id, textChannel);
						break;
					}
					case ChannelTypes.GUILD_VOICE: {
						const voiceChannel = new GuildVoiceChannel(this.client, rawChannel as GuildVoiceChannel, this);
						this.channels.set(voiceChannel.id, voiceChannel);
					}
					case ChannelTypes.GUILD_CATEGORY: {
					}
				}
			}
		}
	}
}
