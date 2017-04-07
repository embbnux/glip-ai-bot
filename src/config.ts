// parse config
import * as path from 'path';
import { readFileSync } from 'fs';

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

let dataDir = './data/';
let config: Config = JSON.parse(readFileSync(dataDir + 'config.json').toString());

config.glipApp.tokenCacheFile = path.join(dataDir, config.glipApp.tokenCacheFile);
export default config;