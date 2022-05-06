import { EventEmitter } from 'events';
import { IBaseClientOptions, Intents, IPresence } from '../util';
import { WebsocketShardManager } from './websocket';

export class BaseClient extends EventEmitter {
	public ws: WebsocketShardManager;
	private _token: string;
	private _intents: Intents[] | Intents;
	private _presence: IPresence;
	public options: IBaseClientOptions;
	constructor(options: IBaseClientOptions) {
		super();

		this.options = options;
		this.ws = new WebsocketShardManager(this);
		this._token = options.token;
		this._intents = options.intents;
		this._presence = options.presence;
	}

	async login() {
		this._token = this._token.replace(/^(Bot|Bearer)\s*/i, '');
		this.emit('debug', `Provided token `);

		if (this._presence) {
			this.ws.presence = this._presence;
		}

		this.emit('debug', 'Attempting to connect to the gateway');

		try {
			await this.ws.connect();
			return this._token;
		} catch (error) {
			throw error;
		}
	}
}
