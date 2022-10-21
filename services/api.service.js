import https from 'https';
import { getKeyValue } from './storage.service.js';
import axios from 'axios';

export const getWeather = async () => {
    const token = await getKeyValue('token') || process.env.TOKEN;
    if (!token) {
        throw new Error('API Token has not been set. Please set it with parameter -t [API_KEY]');
    }
    const city = await getKeyValue('city') || process.env.CITY;
    if (!city) {
        throw new Error('City has not been set. Please set it with parameter -s [CITY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            units: 'metric'
        }
    });
    return data;
    // const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    // console.log(token);
    // url.searchParams.append('appid', token);
    // url.searchParams.append('q', city);
    // https.get(url, (response) => {
    //     let res = '';
    //     response.on('data', (chunk) => {
    //         res += chunk;
    //     });
    //     response.on('end', () => {
    //         console.log(res);
    //     });
    //     response.on('error', (error) => {
    //         console.error(error);
    //     });
    // });
}