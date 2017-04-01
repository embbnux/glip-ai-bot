import { RedisClient } from 'redis';
import Token, { TokenStore } from 'ringcentral-ts/Token';

export default class RedisTokenStore implements TokenStore {

	redis: RedisClient;
	key: string;
	token = new Token();

	constructor(key: string, redis: RedisClient) {
		this.redis = redis;
		this.key = key;
	}

	async restore() {
		let tokenData = await new Promise((resolve, reject) => {
			this.redis.get(this.key, (err, res) => {
				err ? reject(err) : resolve(res);
			});
		});
		this.token.fromCache(JSON.parse(tokenData + ''));
		return this.token;
	}

	save(token: Token) {
		this.redis.set(this.key, JSON.stringify(token), (err, res) => {
			if (err) {
				console.error('Fail to save rc token to redis for key ', this.key, err);
			} else {
				console.log('Token saved to redis', res);
			}
		});
	}

    /**
     * Will be called every time making an API call. Should sync method
     */
	get(): Token {
		if (this.token.accessToken) {
			return this.token;
		}
	}
    /**
     * Should handle error inside the method
     */
	clear(): void {

	}
}