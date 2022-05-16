import { BaseClient } from '../BaseClient';
import { request } from 'undici';
import { DiscordApiUrl } from '../../util';

export class RestManager {
	public client: BaseClient;
	constructor(client: BaseClient) {
		this.client = client;
	}

	public async post(path: string, data: any): Promise<any> {
		const { body } = await request(`${DiscordApiUrl}${path}`, {
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
		const { body } = await request(`${DiscordApiUrl}${path}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bot ${this.client.token}`,
			},
			body: JSON.stringify(data),
		});

		return body.json();
	}

	public async get(path: string): Promise<any> {
		const { body } = await request(`${DiscordApiUrl}${path}`, {
			method: 'GET',
			headers: {
				Authorization: `Bot ${this.client.token}`,
			},
		});

		return body.json();
	}
}
