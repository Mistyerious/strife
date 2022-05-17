import { EventEmitter } from 'events';
import { GuildChannels, IBaseClientOptions, Intents, IPresence } from '../util';
import { WebsocketShardManager } from './websocket';
import { Channel, Guild, RestManager } from './rest';
import { BaseStore } from '../stores';
export class BaseClient extends EventEmitter {
	public ws: WebsocketShardManager;
	public token: string;
	private _intents: Intents[] | Intents;
	private readonly _presence: IPresence;
	public options: IBaseClientOptions;
	public rest: RestManager;
	public channels: BaseStore<string, GuildChannels>;
	public guilds: BaseStore<string, Guild>;
	constructor(token: string, options: IBaseClientOptions) {
		super();

		this.options = options;
		this.ws = new WebsocketShardManager(this);
		this.token = token;
		this._intents = options.intents;
		this._presence = options.presence;
		this.rest = new RestManager(this);
		this.channels = new BaseStore<string, GuildChannels>();
		this.guilds = new BaseStore<string, Guild>();
	}

	async login() {
		this.token = this.token.replace(/^(Bot|Bearer)\s*/i, '');
		this.emit('debug', `Provided token `);

		if (this._presence) {
			this.ws.presence = this._presence;
		}

		this.emit('debug', 'Attempting to connect to the gateway');

		try {
			await this.ws.connect();
			return this.token;
		} catch (error) {
			throw error;
		}
	}
}
