import axios from 'axios';

const URL_BASE = 'https://api.yeatwork.ru/';

export const reqGet = async ({ endPoint, params }) => {
  try {
    const data = await axios.get(`${URL_BASE}${endPoint}?${params}`);
    return data.data;
  } catch {
    return false;
  }
}