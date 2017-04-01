import Glip, { GlipMessage } from './Glip';
import { getRc } from './rc-oauth';

export async function receiveSms(glip: Glip, msg: GlipMessage, aiResult) {
	let rc = await getRc(msg.creatorId);
	let sub = rc.createSubscription();
	sub.onMessage(function (evt) {
		console.log('subscription', evt.body);
		let smsEvt = evt.body;
		let smsNotification = `Sms received for ${smsEvt.to[0].name}(${smsEvt.to[0].phoneNumber}):\n\n${smsEvt.subject}`;
		glip.sendMessage(msg.groupId, smsNotification);
	});
	try {
		await sub.subscribe(['/account/~/extension/~/message-store/instant?type=SMS']);
	} catch (e) {
		glip.sendMessage(msg.groupId, 'Subscribe for sms failed, ' + e);
		return;
	}
	glip.sendMessage(msg.groupId, 'Sms notification enabled for this group.');
}

/* Sample sms notification:
 * { id: '2835129004',
  to:
   [ { phoneNumber: '+19167582086',
       name: 'Kevin Zeng',
       location: 'El Dorado Hills / Lincoln / Roseville / Walnut Grove / West Sacramento / Citrus Heights / Antelope / Folsom / Orangevale
/ Rancho Cordova / Rio Linda / Rocklin / Clarksburg / Fair Oaks / Loomis / Newcastle / North Highlands / North Sacramento / Mather / Granit
e Bay / Carmichael / Auburn, CA' } ],
  from: { phoneNumber: '+13213042353', location: 'Winter Park, FL' },
  type: 'SMS',
  creationTime: '2017-04-01T09:02:40.698Z',
  lastModifiedTime: '2017-04-01T09:02:40.698Z',
  readStatus: 'Unread',
  priority: 'Normal',
  attachments: [ { id: '2835129004', type: 'Text', contentType: 'text/plain' } ],
  direction: 'Inbound',
  availability: 'Alive',
  subject: 'test sms context',
  messageStatus: 'Received' }
 */

export function sendSms() {

}