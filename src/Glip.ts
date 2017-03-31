import RestClient from 'ringcentral-ts/RestClient';
import PagingResult from 'ringcentral-ts/PagingResult';

export default class Glip {

	rest: RestClient;

	constructor(rest: RestClient) {
		this.rest = rest;
	}

	sendMessage(groupId: string, text: string): Promise<GlipMessage> {
		return this.rest.post('/glip/posts', {
			groupId, text
		}).then<any>(res => res.json());
	}

	getGroups(opts?: { type, pageToken, recordCount }): Promise<PagingResult<Group>> {
		return this.rest.get('/glip/groups', opts).then<any>(res => res.json());
	}
}

interface Group {
	id: string;
	type: string;
	displayName: string;
	members: string[];
	email: string;
	isPublic: boolean;
	creationTime: string;
	lastModifiedTime: string;

}

interface GlipMessage {
	id: string;
	groupId: string;
	type: string;
	text: string;
	creatorId: string;
	addedPersonIds: string[];
	creationTime: string[];
	lastModifiedTime: string[];
}