import { RedisClient } from 'redis';
import Token, { TokenStore } from 'ringcentral-ts/Token';

export default class RedisTokenStore implements TokenStore {

	redis: RedisClient;
	key: string;

	constructor(key: string, redis: RedisClient) {
		this.redis = redis;
		this.key = key;
	}

	async get() {
		let tokenData = await new Promise((resolve, reject) => {
			this.redis.get(this.key, (err, res) => {
				err ? reject(err) : resolve(res);
			});
		});
		if (!tokenData) {
			throw new Error('Token not exist in redis.');
		}
		const t = new Token();
		t.fromCache(JSON.parse(tokenData + ''));
		return t;
	}

	save(token: Token): Promise<void> {
		return new Promise((resolve, reject) => {
			this.redis.set(this.key, JSON.stringify(token), (err, res) => {
				if (err) {
					reject('Fail to save rc token to redis for key ' + this.key + '.' + err);
				} else {
					resolve();
				}
			});
		});
	}

    /**
     * Should handle error inside the method
     */
	clear() {
		return new Promise<void>((resolve, reject) => {
			this.redis.del(this.key, (err, res) => {
				if (err) {
					reject('Fail to delete token in redis.' + err);
				} else {
					resolve();
				}
			});
		});
	}
}