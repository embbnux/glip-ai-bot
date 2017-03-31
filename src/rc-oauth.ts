import RingCentral from 'ringcentral-ts';
import Glip from './Glip';
import config from './config';

let rcClients: { [groupId: string]: RingCentral } = {};
export function checkLogin(gId: string, glip: Glip) {
	let rc = rcClients[gId];
	if (!rc) {
		rc = rcClients[gId] = new RingCentral(config.RcApp);
		glip.sendMessage(gId, 'Please log into RingCentral at: ' + rc.oauthUrl(config.RcApp.redirectUri, { state: gId, force: true }));
	}
}

export function loggedIn(groupId: string, callbackUrl: string) {

}