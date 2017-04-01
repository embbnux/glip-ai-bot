// /import RingCentral from 'ringcentral-ts';
import glipAuth from './glip-auth';
import Glip from './Glip';
import * as rcOauth from './rc-oauth';
import ApiAi from './ApiAi';
import './webserver';

main();

async function main() {
	try {
		const glip = new Glip((await glipAuth).rest);
		rcOauth.setup(glip);
		glip.receiveMessage((msg, fromSelf) => {
			if (fromSelf) {
				return;
			}
			let groupId = msg.groupId;
			if (msg.text.match(/\bhelp\b/)) {
				sendHelp(groupId, glip);
			} else {
				glip.sendMessage(groupId, 'Sorry, I don\'t understand you.');
			}
		});
		const ai = new ApiAi();
		const aiText = await ai.send('hi', '123456');
		console.log(aiText);
	} catch (e) {
		console.log(">>>", e)
	}
}

function sendHelp(groupId: string, glip: Glip) {
	let help = `
AiBot:
	help: Show this help;
	Rc Login: Log into your RingCentral account;
	Receive SMS: Show your sms here;
	Disable SMS Notification: Stop showing sms here;
	`;
	glip.sendMessage(groupId, help);
}