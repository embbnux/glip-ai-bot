import RingCentral from 'ringcentral-ts';
import config from './config';
import FileTokenStore from 'ringcentral-ts/FileTokenStore';

let client = new RingCentral(config.glipApp);	// Glip account for bot

client.tokenStore = new FileTokenStore(config.glipApp.tokenCacheFile);

export default client.getToken(config.glipApp.account).catch(e => {
	return client.auth(config.glipApp.account);
}).then(() => client);