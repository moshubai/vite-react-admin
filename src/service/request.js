import { message } from 'antd';
import axios from 'axios';

import { getToken, removeCookies } from '../utils/cookie';
import history from '../utils/history';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
    const accessToken = `${getToken()}` || '';

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
    return response.data;
  },
  async (error) => {
    // const originalRequest = error.config;
    console.log('errorerrorerror', error); //log-xu
    const { response } = error;
    if (response) {
      const { status, data } = response;
      switch (status) {
        case 401:
          message.error('未登陆或登陆已过期，请重新登陆.');
          removeCookies('token');
          history.push('/eorder-web/login');
          break;
        case 403:
          message.error('对不起，您没有访问该资源的权限.');
          removeCookies('token');
          history.push('/eorder-web/login');
          break;
        case 404:
          message.error('抱歉，页面不见了～');
          break;
        case 500:
          message.error('抱歉，系统异常～');
          break;
        default:
          message.error(data.msg || '抱歉，请求失败.');
      }
    }
    return Promise.reject(error);
  },
);

export default service;
