import RestClient from 'ringcentral-ts/RestClient';

export default class Glip {

	rest: RestClient;

	constructor(rest: RestClient) {
		this.rest = rest;
	}

	sendMessage(groupId: string, text: string) {
		return this.rest.post('/glip/posts', {
			groupId, text
		});
	}
}