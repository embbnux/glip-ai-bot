import RestClient from 'ringcentral-ts/RestClient';
import Subscription from 'ringcentral-ts/Subscription';
import PagingResult from 'ringcentral-ts/PagingResult';

export default class Glip {

	rest: RestClient;
	subscription: Subscription;

	constructor(rest: RestClient) {
		this.rest = rest;
	}

	sendMessage(groupId: string, text: string): Promise<GlipMessage> {
		return this.rest.post('/glip/posts', {
			groupId, text
		}).then<any>(res => res.json());
	}

	/**
	 * { uuid: '8416043423403629512-8160187281949800354',
  event: '/restapi/v1.0/glip/posts',
  timestamp: '2017-03-31T07:46:52.013Z',
  subscriptionId: 'eaeffeb1-82e2-44db-9db7-946b932448f7',
  body:
   { id: '37912580',
     groupId: '9199618',
     type: 'TextMessage',
     text: 'Test notifications',
     creatorId: '170853004',
     addedPersonIds: null,
     creationTime: '2017-03-31T07:46:51.706Z',
     lastModifiedTime: '2017-03-31T07:46:51.706Z',
     eventType: 'PostAdded' } }
	 * @param cb 
	 */
	async receiveMessage(cb) {
		let { subscription } = this;
		if (!subscription) {
			subscription = new Subscription(this.rest);
			await subscription.subscribe(['/account/~/extension/~/glip/posts']);
			this.subscription = subscription;
		}
		subscription.onMessage(cb);
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