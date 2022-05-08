export class BaseStore<K, V> extends Map<K, V> {
	constructor() {
		super();
	}

	public hasAll(...keys: K[]) {
		return keys.every((k) => super.has(k));
	}

	public hasAny(...keys: K[]) {
		return keys.some((k) => super.has(k));
	}

	public first(): V | undefined {
		return this.values().next().value;
	}

	public last() {
		return [...this.values()].slice(-1);
	}

	public at(index: number) {
		index = Math.floor(index);
		const arr = [...this.values()];
		return arr[index];
	}

	public toKeyArray() {
		return [...this.keys()];
	}

	public deleteIfExists(key: K) {
		if (this.has(key)) {
			this.delete(key);
		}
	}
}
