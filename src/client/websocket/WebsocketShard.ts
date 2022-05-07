import { EventEmitter } from 'events';
import { IPresence, IWebsocketShardData, Util } from '../../util';
import { WebsocketShardManager } from './WebsocketShardManager';
import WebSocket = require('ws');
import { GatewayDispatchEvents, GatewayOpcodes } from 'discord-api-types/v9';
import { RawData } from 'ws';

export class WebsocketShard extends EventEmitter {
	private ratelimit: { limit: number; remaining: number; time: number; timer: null | NodeJS.Timeout };
	private connection: WebSocket;
	private sessionId: string | null;
	private sequence: number | null;
	private manager: WebsocketShardManager;
	private lastHeartbeatAck: number | null;
	private lastHeartbeat: number | null;
	private readyAt: number | null;
	private identifiedAt: number | null;
	private heartbeatInterval: NodeJS.Timeout | null;
	private heartbeatTimeout: number | null;
	public presence: IPresence;
	public shardId: string;

	constructor(manager: WebsocketShardManager, shardId: string) {
		super();

		this.ratelimit = {
			limit: 120,
			remaining: 120,
			time: 60e3,
			timer: null,
		};
		this.manager = manager;
		this.shardId = shardId;
		this.sessionId = null;
		this.sequence = null;
		this.lastHeartbeatAck = null;
		this.lastHeartbeat = null;
		this.readyAt = null;
		this.identifiedAt = null;
		this.heartbeatInterval = null;
		this.heartbeatTimeout = null;
		this.presence = this.manager.presence;
		this.shardId = shardId;
	}

	connect() {
		if (this.connection) {
			return Promise.resolve();
		}
		this.connection = new WebSocket('wss://gateway.discord.gg?v=9&encoding=json');

		this.connection.on('message', (message: RawData) => this._processMessage(message));
		this.connection.on('error', console.log);
	}

	private debug(message: string) {
		this.manager.client.emit('debug', message);
	}

	private send(data: IWebsocketShardData) {
		if (!this.connection) {
			return Promise.reject(new Error('Not Connected to the gateway'));
		}
		if (!Util.isValidRequest(data)) {
			return Promise.reject(new Error('Invalid Request'));
		}
		if (!this.ratelimit.timer) {
			this.ratelimit.timer = setTimeout(() => {
				this.ratelimit.timer = null;
			}, this.ratelimit.time);
		}
		let count = 0;
		const until = Date.now() + 60000;
		if (++count > this.ratelimit.limit && ![1, 2, 6].includes(data.op)) {
			const error = new Error('Socket rate limit exceeded');
			error['retry_after'] = until - Date.now();
			error['remaining_tries'] = this.ratelimit.remaining - 1;
			return Promise.reject(error);
		}
		this.connection.send(JSON.stringify(data));
		return Promise.resolve();
	}

	private _identify() {
		return this.sessionId ? this._resumeConnection() : this._identifyNew();
	}

	private _identifyNew() {
		this.debug('Identifying');
		this.send({
			op: GatewayOpcodes.Identify,
			d: {
				token: this.manager.client.token,
				intents: this.manager.client.options.intents,
				properties: { $os: process.platform, $browser: 'strife', $device: 'strife' },
				presence: this.presence,
			},
		});
	}

	private _resumeConnection() {
		this.debug('Resuming Connection');
		this.send({
			op: 6,
			d: {
				token: this.manager.client.token,
				session_id: this.sessionId,
				seq: this.sequence,
			},
		});
	}

	private _onClose() {}

	private async _processMessage(message: RawData) {
		const data: IWebsocketShardData = JSON.parse(message.toString());

		if (data.s > this.sequence) {
			this.sequence = data.s;
		}

		switch (data.op) {
			case GatewayOpcodes.Dispatch: {
				switch (data.t) {
					case GatewayDispatchEvents.Ready: {
						this.readyAt = this.identifiedAt = Date.now();
						this.sessionId = data.d.session_id;
						this.debug(`'Gateway Ready' (Session = ${data.d.session_id})`);
						this.manager.client.emit('ready', data.d);
						if (this.manager.client.options.cacheEnabled) {
						}
						return;
					}
					case GatewayDispatchEvents.Resumed: {
						this.readyAt = Date.now();
						this.debug(`Gateway Resumed (Session = ${this.sessionId})`);
						this.emit('resumed', data.d);
						return;
					}
				}
				this.manager.client.emit(data.t, data.d);
				break;
			}
			case GatewayOpcodes.Hello: {
				const interval = data.d.heartbeat_interval;
				this.heartbeatTimeout = Math.floor(interval * Math.random());
				this.debug(`Received Hello. First heartbeat in ${this.heartbeatTimeout}ms (Interval = ${interval}ms)`);
				this.heartbeatInterval = setTimeout(() => {
					this.lastHeartbeat = Date.now();
					this.debug('Sending Heartbeat');
					this.send({ op: GatewayOpcodes.Heartbeat, d: this.sequence });
					this.heartbeatInterval = setInterval(() => {
						this.debug('Sending Heartbeat');
						this.send({ op: GatewayOpcodes.Heartbeat, d: this.sequence });
					}, interval);
				}, this.heartbeatTimeout);

				if (this.sessionId && this.sequence) {
					this._resumeConnection();
				} else {
					this._identify();
				}
				break;
			}
			case GatewayOpcodes.Resume: {
				this.debug('Discord asked us to reconnect');
				await this.connection.close();
				this.connect();
				break;
			}
			case GatewayOpcodes.HeartbeatAck: {
				this.debug('Received ACK');
				this.lastHeartbeatAck = Date.now();
				break;
			}
			case GatewayOpcodes.InvalidSession: {
				this.debug('Received Invalid session. Reconnecting in 1-5s');
				if (data.d) {
					this._resumeConnection();
				} else {
					this.sessionId = null;
					this.sequence = null;
					setTimeout(() => this._identifyNew(), Math.floor(Math.random() * 4000) + 1000);
				}
				break;
			}
		}
	}

	private _onError(error: any) {
		this.emit('shardError', error);
	}
}
