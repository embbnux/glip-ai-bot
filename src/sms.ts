import Subscription from 'ringcentral-ts/Subscription';
import Glip, { GlipMessage } from './Glip';
import { getRc } from './rc-oauth';

export async function receiveSms(glip: Glip, msg: GlipMessage, aiResult) {
	let glipUserId = msg.creatorId;
	let sub = smsSubscriptions[glipUserId];
	if (!sub) {
		let rc = await getRc(glipUserId);
		sub = new SmsSubscriptionForGlip(rc.createSubscription(), glip);
		smsSubscriptions[glipUserId] = sub;
	}
	try {
		if (await sub.addGroup(msg.groupId)) {
			glip.sendMessage(msg.groupId, 'Future sms of your RingCentral account will be sent here.');
		} else {
			glip.sendMessage(msg.groupId, 'Sms notification already enabled for this chat.');
		}
	} catch (e) {
		glip.sendMessage(msg.groupId, 'Enable sms notification failed:' + e);
	}
}


let smsSubscriptions: { [glipUserId: string]: SmsSubscriptionForGlip } = {};

class SmsSubscriptionForGlip {
	recipientGroups: string[] = [];
	ownerGlipUserId: string;

	subscription: Subscription;
	glip: Glip;

	constructor(sub: Subscription, glip: Glip) {
		this.subscription = sub;
		this.glip = glip;
		sub.onMessage((evt) => {
			let smsEvt = evt.body;
			let smsNotification = `Sms received for ${smsEvt.to[0].name}(${smsEvt.to[0].phoneNumber}):\n\n${smsEvt.subject}`;
			for (let groupId of this.recipientGroups) {
				glip.sendMessage(groupId, smsNotification);
			}
		});
	}

	/**
	 * Return true if added, false if existed
	 * @param groupId 
	 */
	async addGroup(groupId: string) {
		let idx = this.recipientGroups.indexOf(groupId);
		if (idx > -1) {
			return false;
		}
		this.recipientGroups.push(groupId);
		if (this.recipientGroups.length === 1) {
			await this.subscription.subscribe(['/account/~/extension/~/message-store/instant?type=SMS']);
		}
		return true;
	}
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