import axios, { AxiosError } from 'axios';

import config from '@/config';
// import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

// import { generateJWT } from './generateJWT';
console.log(config.apiUrl);
const customAxios = axios.create({
  baseURL: config.apiUrl,
  validateStatus: (status) => status < 400,
});

/* const getInitDataRaw = () => {
  try {
    const { initDataRaw } = retrieveLaunchParams();

    return { data: initDataRaw, for: 'tma' };
  } catch (e) {
    return { data: new Date(), for: 'ton' };
  }
};

const initDataRaw = getInitDataRaw();

customAxios.interceptors.request.use(
  async (config) => {
    const jwt = await generateJWT({ initDataRaw: initDataRaw.data });
    config.headers['Authorization'] = `${initDataRaw.for} ${jwt}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); */

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error instanceof AxiosError &&
      error.response?.status &&
      error.response?.status >= 400
    ) {
      return Promise.reject(error.response.data.message);
    }
  }
);

export default customAxios;
