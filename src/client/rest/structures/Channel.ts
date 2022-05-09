import { ChannelData, ChannelTypes } from '../../../util';
import { BaseClient } from '../../BaseClient';

export class Channel {
	public client: BaseClient;
	public id: string;
	public type: ChannelTypes | string;
	constructor(client: BaseClient, data: ChannelData) {
		this.client = client;
		this.id = data.id;
		this.type = data.type ?? 'UNKNOWN';
	}
}
