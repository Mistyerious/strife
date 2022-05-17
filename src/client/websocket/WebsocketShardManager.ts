import { EventEmitter } from 'events';
import { BaseStore } from '../../stores';
import { WebsocketShard } from './WebsocketShard';
import { IPresence } from '../../util';
import { BaseClient } from '../BaseClient';
import { SocketStack } from '../../util/SocketStack';
import { isArray } from 'util';

export class WebsocketShardManager extends EventEmitter {
	public shards: BaseStore<string, WebsocketShard>;
	public presence: IPresence;
	public client: BaseClient;
	public totalShards: number;
	public socketStack: SocketStack<WebsocketShard>;
	constructor(client: BaseClient) {
		super();

		this.client = client;

		this.totalShards = this.client.options.shards
			? isArray(this.client.options.shards)
				? this.client.options.shards.length
				: this.client.options.shards
			: 1;

		this.shards = new BaseStore();

		this.socketStack = new SocketStack();

		this.presence = client.options.presence;
	}

	async connect() {
		const shard = new WebsocketShard(this, '1');
		this.shards.set(shard.shardId, shard);
		await shard.connect();
	}
}
