import * as express from 'express';
import * as rcOauth from '../rc-oauth';
let app: any = express();

app.get('/rc-oauth-callback', async (req, res) => {
	let fullUrl = req.protocol + '://' + req.headers.host + req.url;
	try {
		await rcOauth.loggedIn(req.query.state, fullUrl);
		res.setHeader('content-type', 'text/html');
		res.end('<html><body>Login success, close me and go back to glip.<script>window.close();</script></body></html>');
	} catch (e) {
		console.log('Rc oauth error', e);
		res.end('Can not log into RingCentral.' + e);
	}
});

app.listen(process.env.PORT || 8080);