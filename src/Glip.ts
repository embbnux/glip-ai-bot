import RestClient from 'ringcentral-ts/RestClient';
import Subscription from 'ringcentral-ts/Subscription';
import PagingResult from 'ringcentral-ts/PagingResult';

export default class Glip {

	rest: RestClient;
	subscription: Subscription;
	person: Person;	// Current Persion Id

	constructor(rest: RestClient) {
		this.rest = rest;
		this.getPerson().then(p => {
			this.person = p;
		});
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
	async receiveMessage(cb: (msg: GlipMessage, fromSelf: boolean) => void) {
		let { subscription } = this;
		if (!subscription) {
			subscription = new Subscription(this.rest);
			this.subscription = subscription;
			await subscription.subscribe(['/account/~/extension/~/glip/posts']);
		}
		subscription.onMessage(notification => {
			let msg: GlipMessage = notification.body;
			cb(msg, msg.creatorId === this.person.id);
		});
	}

	getGroups(opts?: { type, pageToken, recordCount }): Promise<PagingResult<Group>> {
		return this.rest.get('/glip/groups', opts).then<any>(res => res.json());
	}

	getPerson(personId = '~'): Promise<Person> {
		return this.rest.get('/glip/persons/' + personId).then<any>(res => res.json());
	}
}

interface Person {
	// ID of person
	id: string;

	// First name of person
	firstName: string;

	// Last name of person
	lastName: string;

	// Gender of person
	gender: string;

	// Email of user
	email: string;

	// Current location of person
	location: string;

	// ID of company person belongs to
	companyId: string;

	// Time of creation (ISO format)
	creationTime: string;

	// Time of last modification (ISO format)
	lastModifiedTime: string;

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