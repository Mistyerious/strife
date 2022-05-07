import { BaseStore } from '../stores';
import { WebsocketShard } from '../client';

export interface IWebsocketShardData {
	op: number;
	d: any;
	t?: null | string;
	s?: null | number;
}

export interface IBaseClientOptions {
	intents: Array<Intents> | Intents;
	presence?: IPresence;
	shards?: BaseStore<string, WebsocketShard>;
}

export enum Intents {
	GUILDS = 1 << 0,
	GUILD_MEMBERS = 1 << 1,
	GUILD_BANS = 1 << 2,
	GUILD_EMOJIS_AND_STICKERS = 1 << 3,
	GUILD_INTEGRATIONS = 1 << 4,
	GUILD_WEBHOOKS = 1 << 5,
	GUILD_INVITES = 1 << 6,
	GUILD_VOICE_STATES = 1 << 7,
	GUILD_PRESENCES = 1 << 8,
	GUILD_MESSAGES = 1 << 9,
	GUILD_MESSAGE_REACTIONS = 1 << 10,
	GUILD_MESSAGE_TYPINGS = 1 << 11,
	DIRECT_MESSAGES = 1 << 12,
	DIRECT_MESSAGE_REACTIONS = 1 << 13,
	DIRECT_MESSAGE_TYPING = 1 << 14,
	GUILD_SCHEDULED_EVENTS = 1 << 16,
}

export interface IPresence {
	status: 'idle' | 'dnd' | 'online' | 'offline' | 'invisible';
	activities: Array<IActivites>;
}

export interface IActivites {
	name: string;
	type: ActivityTypes;
	url?: string | null;
}

export enum ActivityTypes {
	Game,
	Streaming,
	Listening,
	Watching,
	Competing = 5,
}

export const VERSION = 'v9';

export const Api = Object.freeze({
	GET_CHANNEL_BY_ID: `https://discord.com/api/${VERSION}/channels/:id`,
	MODIFY_CHANNEL_BY_ID: `https://discord.com/api/${VERSION}/channels/:id`,
	DELETE_CHANNEL_BY_ID: `https://discord.com/api/${VERSION}/channels/:id`,
	CREATE_GUILD_CHANNEL: `https://discord.com/api/${VERSION}/guilds/:guildId/channels`,
});
