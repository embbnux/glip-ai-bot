// /import RingCentral from 'ringcentral-ts';
import glipAuth from './glip-auth';
import Glip, { GlipMessage } from './Glip';
import * as rcOauth from './rc-oauth';
import ApiAi from './ApiAi';
import './webserver';
import * as sms from './sms';

main();

async function main() {
	const ai = new ApiAi();
	try {
		const glip = new Glip((await glipAuth).rest);
		glip.receiveMessage(async (msg, fromSelf) => {
			if (fromSelf) {
				return;
			}
			// console.log('Glip Message received', msg);
			const aiRes = await ai.send(msg.text, msg.groupId);
			if (!aiRes) {
				console.error('Fail to get Ai response');
				return;
			}
			const aiResult = aiRes.result;
			// console.log('>>aiResult', aiResult);
			const action = aiResult.action;
			let actionFn = actions[action] || defaultActionReactor;
			actionFn(glip, msg, aiResult);
		});
	} catch (e) {
		console.log("Error", e)
	}
}

/*
 * Sample result returned from api.ai:
 * groupId { id: '489f1d39-b9aa-4b40-be96-51417961829d',
  timestamp: '2017-04-01T04:28:27.295Z',
  lang: 'en',
  result:
   { source: 'agent',
     resolvedQuery: 'send sms to Kevin',
     action: 'sendSMS',
     actionIncomplete: false,
     parameters: { messageText: '', userName: 'Kevin' },
     contexts: [],
     metadata:
      { intentId: '5ee56a9e-9c63-43da-9980-eb118ce3cb44',
        webhookUsed: 'false',
        webhookForSlotFillingUsed: 'false',
        intentName: 'send sms to Kevin: hi' },
     fulfillment: { speech: 'Message has sent', messages: [Object] },
     score: 0.75 },
  status: { code: 200, errorType: 'success' },
  sessionId: '123456' }

 */


function defaultActionReactor(glip: Glip, msg: GlipMessage, aiResult) {
	glip.sendMessage(msg.groupId, aiResult.fulfillment.speech);
}

const actions: { [action: string]: (glip: Glip, msg: GlipMessage, aiResult) => any } = {
	//help: defaultActionReactor,
	receiveSMS: sms.receiveSms,
	disableReceiveSMS: null,
	sendSMS: null,
	rcLogin: rcOauth.rcLogin,
	rcLogout: null
};