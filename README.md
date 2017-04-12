# Glip AI BOT

This is an AI Assistant Bot for Glip, using API.AI and RingCentral API

## Demo

Talk in glip with this chat bot:

```
> hi
Good day!

```

```
> What’s the weather like in London
Today in London : Mostly Cloudy, the temperature is 48 F
```

```
> Help
Help: Show this help;
Rc Login: Log into your RingCentral account;
Send SMS: sms to 101 say what are you doing;
Receive SMS: Show your sms here;
Disable SMS Notification: Stop showing sms here;
```

```
> login to rc
login with oauth
> who am i
> send message to Kevin tell him we won
Send SMS(we won) to Kevin(101) success.
> sms to 101 tell him this is sms message
Send SMS(this is sms message) to Kevin(101) success.
> logout rc account
```

## Start A Bot

### Preinstall

* nodejs
* yarn

```
git clone https://github.com/embbnux/glip-ai-bot.git
yarn
npm run build
npm start
```

### Add config file

to create data/config.json file
```
cd project_dir
mkdir data
vim data/config.json
```
example of config.json:
```
{
	"glipApp": {
		"server": "https://platform.devtest.ringcentral.com",
		"appKey": "ringcentral_glip_app_key",
		"appSecret": "ringcentral_glip_app_secret",
		"account": {
			"username": "rc_phone_number",
			"extension": "rc_extension_number",
			"password": "rc_account_password"
		},
		"tokenCacheFile": "./glip-token-cache.json"
	},
	"RcApp": {
		"server": "https://platform.devtest.ringcentral.com",
		"appKey": "ringcentral_app_key",
		"appSecret": "ringcentral_app_secret",
		"redirectUri": "http://localhost:8080/rc-oauth-callback"
	},
	"ApiAi": {
		"token": "api.ai token"
	}
}
```

### start server

```
npm start
```
