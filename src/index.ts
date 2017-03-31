// /import RingCentral from 'ringcentral-ts';
import glipAuth from './glip-auth';
import Glip from './Glip';
import * as rcOauth from './rc-oauth';
import './webserver';

main();

async function main() {
	try {
		let glip = new Glip((await glipAuth).rest);
		rcOauth.setup(glip);
		/*let groups = await glip.getGroups();
		for (let group of groups.records) {
			let result = await glip.sendMessage(group.id, 'Test Message sent to group ' + group.id);
			console.log('>>', result)
		}*/
	} catch (e) {
		console.log(">>>", e)
	}


}