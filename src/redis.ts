import { createClient } from 'redis';

const redisClient = createClient();;

redisClient.on('error', err => {
	console.error('Redis error', err);
});

/*

====================
Sms notification:

groups-receive-sms:glip-user:{user-id} [{groupId}]
sms-subscription:glip-user:{user-id} {subscriptionId}

 */
export default redisClient;