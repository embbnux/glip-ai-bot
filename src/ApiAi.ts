import ApiAi from 'apiai';

export default class ApiAi {
  constructor(token: string) {
    this._ai = ApiAi(token);
  }

  _sendMessage(text, sessionId) {
    return new Promise((resolve, reject) => {
      const request = this._ai.textRequest(text, { sessionId });
      request.on('response', (response) => {
         resolve(response);
      });

      request.on('error', (error) => {
        reject(error);
      });

      request.end();
    });
  }

  async send(text, sessionId) {
    try {
      const response = await this._sendMessage(text, sessionId);
      return response;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
