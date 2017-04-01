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
		const ai = new ApiAi();
		const aiText = await ai.send('hi', '123456');
		console.log(aiText);
		/*let groups = await glip.getGroups();
		for (let group of groups.records) {
			let result = await glip.sendMessage(group.id, 'Test Message sent to group ' + group.id);
			console.log('>>', result)
		}*/
	} catch (e) {
		console.log(">>>", e)
	}


}