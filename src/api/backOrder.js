import service from '../service/request';
import { eOrder } from './config.js';

// 查询订单列表信息
const getOrderListInformation = (data) => {
  return service({
    url: eOrder + '/order/orderBackend/orderList',
    method: 'POST',
    data,
  });
};
// 查询订单详情信息
const getOrderDetails = (params) => {
  return service({
    url: eOrder + '/order/orderBackend/orderDetail',
    method: 'GET',
    params,
  });
};

const backOrderApi = {
  getOrderListInformation,
  getOrderDetails,
};

export default backOrderApi;
