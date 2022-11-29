import axios from 'axios';

import { getToken } from '../utils/cookie';

const param = {
  lang: 'zh_CN',
};

const service = axios.create({
  baseURL: 'https://62e79d910e5d74566af825ad.mockapi.io/api/public/',
  timeout: 10000,
  // params: param,
  headers: {
    'content-type': 'application/json',
    timeout: 150000,
    withCredentials: true,
    responseType: 'json',
  },
});

service.interceptors.request.use(
  async (config) => {
    const accessToken = `Bearer ${getToken()}` || '';

    config.headers = {
      Authorization: accessToken,
      Accept: 'application/json',
    };

    return config;
  },
  (error) => Promise.reject(error),
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const accessToken = await refreshAccessToken();

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

      return service(originalRequest);
    }

    return Promise.reject(error);
  },
);

const refreshAccessToken = async () => {
  return '';
};

export default service;
