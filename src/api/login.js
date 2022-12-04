// /eorder-oper/api/v1/omLogin/loginByPassword
import service from '../service/request';
import { eOrder } from './config.js';

// 登录
export const apiLogin = (data) => {
  return service({
    url: eOrder + '/omLogin/loginByPassword',
    method: 'POST',
    data,
  });
};

// 登出

export const apiLoginOut = (data) => {
  return service({
    url: eOrder + '/sys/operator/loginOut',
    method: 'POST',
    data,
  });
};
