import { isArray } from 'util';
import { Intents, IWebsocketShardData } from './Constants';

export class Util {
	static isValidProperties(obj) {
		return (
			obj && typeof obj === 'object' && ['$os', '$browser', '$device'].every((x) => typeof obj[x] === 'string')
		);
	}

	static isValidRequest(data?: IWebsocketShardData) {
		return data && data.d && data.op;
	}

	static isValidPresence(obj) {
		if (
			!obj ||
			typeof obj !== 'object' ||
			typeof obj.since === 'undefined' ||
			typeof obj.afk !== 'boolean' ||
			typeof obj.status !== 'string'
		) {
			return false;
		}
		if (!['online', 'dnd', 'idle', 'offline'].includes((obj.status = obj.status.toLowerCase()))) {
			return false;
		}
		if (!isArray(obj.activities)) {
			return false;
		}
		if (
			obj.activities.length &&
			!obj.activities.every((x) => typeof x.name === 'string' && [0, 1, 2, 3, 4, 5].includes(x.type))
		) {
			return false;
		}
		return true;
	}

	static parseIntents(intents: Array<Intents>) {
		let value = 0;
		for (const intent of intents) {
			value += intent.valueOf();
		}

		return value;
	}
}
