import { isArray } from 'util';
import { Intents, IPresence, IWebsocketShardData } from './Constants';

export class Util {
	static isValidProperties(obj: any) {
		return (
			obj && typeof obj === 'object' && ['$os', '$browser', '$device'].every((x) => typeof obj[x] === 'string')
		);
	}

	static isValidRequest(data?: IWebsocketShardData) {
		return data && data.d && data.op;
	}

	static isValidPresence(obj: IPresence) {
		if (!obj || typeof obj !== 'object' || typeof obj.since === 'undefined') {
			return false;
		}
		if (
			!['online', 'dnd', 'idle', 'offline'].includes((obj.status = obj.status.toLowerCase())) ||
			!isArray(obj.activities)
		) {
			return false;
		}
		return !(obj.activities.length && !obj.activities.every((x) => [0, 1, 2, 3, 4, 5].includes(x.type)));
	}

	static parseIntents(intents: Array<Intents>) {
		let value = 0;
		for (const intent of intents) {
			value += intent.valueOf();
		}

		return value;
	}
}
