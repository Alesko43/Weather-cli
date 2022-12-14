import https from 'https';
import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {

	const weatherIcons = {
		'01': 'âī¸',
		'02': 'đ¤ī¸',
		'03': 'âī¸',
		'04': 'đ§ī¸',
		'09': 'đ§ī¸',
		'10': 'đĻī¸',
		'11': 'đŠī¸',
		'13': 'âī¸',
		'50': 'đĢī¸'
	}

	return weatherIcons[icon.slice(0,-1)]
};

const getWeather = async (city) => {

	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('Not found api key, create api key with "-t [API_KEY]" command')
	}

	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'en',
			units: 'metric'
		}
	});
	return data;
}

export { getWeather, getIcon };