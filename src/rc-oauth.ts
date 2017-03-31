import RingCentral from 'ringcentral-ts';
import Glip from './Glip';
import config from './config';

let glip: Glip;
let rcClients: { [groupId: string]: RingCentral } = {};

export function setup(g: Glip) {
	glip = g;

	glip.receiveMessage(msg => {
		let groupId = msg.body.groupId;
		checkLogin(groupId);
		let rc = rcClients[groupId];
		if (rc && msg.body.text.match('whoami')) {
			let token = rc.rest.getToken();
			token && glip.sendMessage(groupId, token.owner);
		}
	});
}

function checkLogin(gId: string) {
	let rc = rcClients[gId];
	if (!rc) {
		rc = rcClients[gId] = new RingCentral(config.RcApp);
		glip.sendMessage(gId, 'Please log into RingCentral at: ' + rc.oauthUrl(config.RcApp.redirectUri, { state: gId, force: true }));
	}
}

/**
 * 
 * @param groupId 
 * @param callbackUrl 
 */
export async function loggedIn(groupId: string, callbackUrl: string) {
	let rc = rcClients[groupId] || new RingCentral(config.RcApp);
	await rc.oauth(callbackUrl);
	glip.sendMessage(groupId, 'You logged in as ' + glip.rest.getToken().owner);
}