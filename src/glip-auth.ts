import RingCentral from 'ringcentral-ts';
import config from './config';
import FileTokenStore from 'ringcentral-ts/FileTokenStore';

let client = new RingCentral(config.glipApp);

let store = new FileTokenStore(config.glipApp.tokenCacheFile);

export default client.restoreToken(config.glipApp.account, store).catch(e => {
	return client.auth(config.glipApp.account);
}).then(() => client);