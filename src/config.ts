// parse config
import * as path from 'path';

export interface Config {
	glipApp: {
		"server": string;
		"appKey": string;
		"appSecret": string;
		"account": {
			"username": string,
			"extension": string;
			"password": string;
		};
		"tokenCacheFile": string; // Resolved absolute path
	};

	RcApp: {
		"server": string;
		"appKey": string;
		"appSecret": string;
		redirectUri: string;
	};
}

let config: Config = require('../data/config.json');

config.glipApp.tokenCacheFile = path.resolve(__dirname, '../data/', config.glipApp.tokenCacheFile);
export default config;