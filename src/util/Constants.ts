import { BaseStore } from '../stores';
import { WebsocketShard } from '../client';
import {
	ChannelType,
	GuildDefaultMessageNotifications,
	GuildExplicitContentFilter,
	GuildMFALevel,
	GuildVerificationLevel,
	OverwriteType,
	Snowflake,
} from 'discord-api-types/v9';
import { Channel } from '../client/rest';

export interface IWebsocketShardData {
	op: number;
	d: any;
	t?: null | string;
	s?: null | number;
}

export interface IBaseClientOptions {
	intents: Array<Intents>;
	presence?: IPresence;
	shards?: BaseStore<string, WebsocketShard>;
	cache?: CacheOptions;
}

interface CacheOptions {
	guild?: boolean;
	channels?: boolean;
	users?: boolean;
	members?: boolean;
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

const VERSION = 'v9';
const URL = `https://discord.com/api/${VERSION}`;

export const GatewayEvents = Object.freeze({
	MESSAGE_CREATE: 'messageCreate',
	MESSAGE_DELETE: 'messageDelete',
	MESSAGE_UPDATE: 'messageUpdate',
	MESSAGE_DELETE_BULK: 'messageDeleteBulk',
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
	CHANNEL_CREATE: 'channelCreate',
	CHANNEL_UPDATE: 'channelUpdate',
	CHANNEL_DELETE: 'channelDelete',
});

export interface MessageData {
	content: string;
	id: string;
	author: MessageAuthor;
	embeds: [];
	mentions: [];
	pinned: boolean;
	mention_everyone: boolean;
	tts: boolean;
	timestamp: string;
	edited_timestamp: null | string;
	flags: number;
	components: [];
	type: number;
	channel_id: string;
	mention_roles: [];
	mention_channels: [];
}

export interface MessageAuthor {
	id: string;
	username: string;
	avatar: null | string;
	avatar_decoration: null | string;
	discriminator: string;
	public_flags: number;
	bot: boolean;
}

export interface ChannelData {
	id: Snowflake;
	type: ChannelType;
	guild_id?: Snowflake;
	position?: number | null;
	permission_overwrites?: Array<PermissionOverwrites>;
	name: string;
	topic: string;
	parent: string;
}

export interface PermissionOverwrites {
	id: string;
	type: OverwriteType;
	allow: string;
	deny: string;
}

export interface GuildData {
	id: Snowflake;
	name: string;
	icon: string;
	splash: string;
	discovery_splash: string;
	owner?: boolean;
	owner_id: Snowflake;
	permissions?: string;
	afk_channel_id: Snowflake;
	afk_timeout: number;
	widget_enabled?: boolean;
	widget_channel_id?: string;
	verification_level: GuildVerificationLevel;
	default_message_notifications: GuildDefaultMessageNotifications;
	explicit_content_filter: GuildExplicitContentFilter;
	roles: [];
	emojis: [];
	features: [];
	mfa_level: GuildMFALevel;
	application_id?: Snowflake;
	system_channel_id?: Snowflake;
	rules_channel_id?: Snowflake;
	joined_at?: string;
	unavailable: boolean;
	channels: Array<Channel>;
}
