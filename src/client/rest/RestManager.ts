import { BaseClient } from '../BaseClient';
import { request } from 'undici';

export class RestManager {
	public client: BaseClient;
	constructor(client: BaseClient) {
		this.client = client;
	}

	public async post(path: string, data: any): Promise<any> {
		const { body } = await request(URL + path, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bot ${this.client.token}`,
			},
			body: JSON.stringify(data),
		});

		return body.json();
	}

	public async patch(path: string, data: any): Promise<any> {
		const { body } = await request(URL + path, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bot ${this.client.token}`,
			},
			body: JSON.stringify(data),
		});

		return body.json();
	}

	// public async getChannel(id: string): Promise<RESTGetAPIChannelResult> {
	// 	const { body } = await request(Api.GET_CHANNEL_BY_ID.replace(':id', id), {
	// 		headers: {
	// 			Authorization: `Bot ${this.client.token}`,
	// 		},
	// 	});
	//
	// 	return body.json();
	// }
	//
	// public async modifyChannel(
	// 	id: string,
	// 	data: RESTPatchAPIChannelJSONBody & { reason?: string },
	// ): Promise<RESTPatchAPIChannelResult> {
	// 	const { body } = await request(Api.MODIFY_CHANNEL_BY_ID.replace(':id', id), {
	// 		headers: {
	// 			Authorization: `Bot ${this.client.token}`,
	// 			'Content-Type': 'application/json',
	// 			'X-Audit-Log-Reason': data.reason,
	// 		},
	// 		body: JSON.stringify(data),
	// 		method: 'PATCH',
	// 	});
	//
	// 	return body.json();
	// }
	//
	// public async deleteChannel(id: string, reason?: string): Promise<RESTDeleteAPIChannelResult> {
	// 	const { body } = await request(Api.DELETE_CHANNEL_BY_ID.replace(':id', id), {
	// 		headers: {
	// 			Authorization: `Bot ${this.client.token}`,
	// 			'X-Audit-Log-Reason': reason,
	// 		},
	// 		method: 'DELETE',
	// 	});
	//
	// 	return body.json();
	// }
	//
	// public async createChannel(
	// 	guildId: string,
	// 	data: RESTPostAPIGuildChannelJSONBody & { reason?: string },
	// ): Promise<RESTPostAPIGuildChannelResult> {
	// 	const { body } = await request(Api.CREATE_GUILD_CHANNEL.replace(':guildId', guildId), {
	// 		body: JSON.stringify(data),
	// 		headers: {
	// 			Authorization: `Bot ${this.client.token}`,
	// 			'X-Audit-Log-Reason': data.reason,
	// 			'Content-Type': 'application/json',
	// 		},
	// 		method: 'POST',
	// 	});
	//
	// 	return body.json();
	// }
	//
	// public async createMessage(
	// 	channelId: string,
	// 	content: RESTPostAPIChannelMessageJSONBody,
	// ): Promise<RESTPostAPIChannelMessageResult> {
	// 	const { body } = await request(Api.CREATE_MESSAGE.replace(':channelId', channelId), {
	// 		body: JSON.stringify(content),
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: `Bot ${this.client.token}`,
	// 		},
	// 		method: 'POST',
	// 	});
	//
	// 	return body.json();
	// }

	// public async populateCache() {
	// 	if (this.client.options.cacheEnabled) {
	// 	}
	// }
}
