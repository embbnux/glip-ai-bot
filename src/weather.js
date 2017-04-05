import { request } from 'urllib';
import * as querystring from 'querystring';
const baseUrl = 'https://query.yahooapis.com/v1/public/yql?';

function getYqlQuery(city) {
  return `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${city}')`;
}

async function requestWeatherForecast(city) {
    const options = { dataType: 'json' };
    const yqlQuery = getYqlQuery(city);
    const url = baseUrl + querystring.stringify({ q: yqlQuery });
    const response = await request(url, options);
    const query = response.data.query;
    if (!query) {
        return null;
    }
    const result = query.results;
    if (!result) {
        return null;
    }
    const channel = result.channel;
    if (!channel ) {
        return null;
    }

    const item = channel.item;
    if (!item ) {
        return null;
    }
    const condition = item.condition;
    if (!condition ) {
        return null;
    }
    const location = channel.location;
    const units = channel.units;
    if (!location || !units) {
        return null;
    }
    return `Today in ${location.city} : ${condition.text}, the temperature is ${condition.temp} ${units.temperature}`;
}

async function getWeather(glip, msg, aiResult) {
    const city = aiResult.parameters['geo-city'];
    const result = await requestWeatherForecast(city);
    if (result) {
        glip.sendMessage(msg.groupId, result);
    }
}

export default getWeather;
