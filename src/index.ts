import glipAuth from './glip-auth';

main();

async function main() {
	try {
		let glip = (await glipAuth).rest;
		console.log('>>> logged in', glip)
	} catch (e) {
		console.log(">>>", e)
	}


}