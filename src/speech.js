import * as Speech from '@google-cloud/speech';
import * as ffmpeg from 'fluent-ffmpeg';
import config from '../data/config';

class SpeechClient {
	constructor() {
		this._speech = Speech({
			projectId: 'config.googleCloudPoject',
            keyFilename: './data/google-cloud.json'
		});
	}

	_recognize(filePath, option = {}) {
		const opts = {
            ...option,
        };
		return new Promise((resolve, reject) => {
			this._speech.recognize(filePath, opts, (error, transcript) => {
			  if (error) {
			  	reject(error);
			  	return;
			  }
			  resolve(transcript);
			});
		});
	}

	_transformMp3ToWav(from, to) {
		return new Promise((resolve, reject) => {
			ffmpeg(from)
				.toFormat('flac')
				.on('error', function (err) {
				    reject(err);
				})
				.on('end', function () {
				    resolve();
				})
				.save(to);
		});
	}

	async recognize(filePath, option = {}) {
		try {
			const toPath = filePath + '.flac'
			await this._transformMp3ToWav(filePath, toPath);
			const response = await this._recognize(toPath, option);
			return response;
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

export default SpeechClient;
