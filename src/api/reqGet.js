import axios from 'axios';

const URL_BASE = 'https://api.yeatwork.ru/';

export const reqGet = async ({ endPoint, params={}, signal }) => {

  try {
    const config = { params };
    if (signal) config.signal = signal;
    const resp = await axios.get(`${URL_BASE}${endPoint}`, config);
    return resp.data;
  } catch(error) {
    if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
      return null;
    }
    return false;
  }
}