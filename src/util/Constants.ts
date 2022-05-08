import { BaseStore } from '../stores';
import { WebsocketShard } from '../client';
import {
	APIMessageReferenceSend,
	ChannelType,
	EmbedType,
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
	guild?: CacheOptionInternal;
	channels?: CacheOptionInternal;
	users?: CacheOptionInternal;
	members?: CacheOptionInternal;
}

interface CacheOptionInternal {
	limit?: number;
	time?: number;
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
export const DiscordApiUrl = `https://discord.com/api/${VERSION}`;

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
	GUILD_CREATE: 'guildCreate',
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
	nsfw: boolean;
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

export interface MessageCreateData {
	content: string;
	nonce?: number | string;
	tts?: boolean;
	embeds?: Array<Embed>;
	embed?: Embed;
	allowed_mentions?: AllowedMentions;
	message_reference?: MessageReferenceSend;
	components?: [];
	sticker_ids?: Array<Snowflake>;
	attachments?: [];
	flags?: MessageFlags;
}

export interface AllowedMentions {
	roles?: boolean;
	users?: boolean;
	replied_users?: boolean;
}

interface MessageReferenceSend {
	message_id?: Snowflake;
	channel_id?: Snowflake;
	guild_id?: Snowflake;
	fail_if_not_exists?: boolean;
}

export enum MessageFlags {
	CROSSPOSTED = 1 << 0, // this message has been published to subscribed channels (via Channel Following)
	IS_CROSSPOST = 1 << 1, // this message originated from a message in another channel (via Channel Following)
	SUPRESS_EMBEDS = 1 << 2, // do not include any embeds when serializing this message
	SOURCE_MESSAGE_DELETED = 1 << 3, //	the source message for this crosspost has been deleted (via Channel Following)
	URGENT = 1 << 4, //	this message came from the urgent message system
	HAS_THREADD = 1 << 5, // this message has an associated thread, with the same id as the message
	EPHEMERAL = 1 << 6, // this message is only visible to the user who invoked the Interaction
	LOADING = 1 << 7, // this message is an Interaction Response and the bot is "thinking"
	FAILEDD_TO_MENTION_SOME_ROLES_IN_THREAD = 1 << 8, // this message failed to mention some roles and add their members to the thread
}

interface Embed {
	title?: string;
	type?: string;
	description?: string;
	url?: string;
	timestamp?: string;
	color?: number;
	footer?: EmbedFooter;
	image?: EmbedImage;
	thumbnail?: EmbedThumbnail;
}

interface EmbedFooter {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

interface EmbedImage {
	url: string;
	proxy_url?: string;
	height?: string;
	width?: string;
}

interface EmbedThumbnail extends EmbedImage {}
