import service from '../service/request';

// export const apiGetUserList = () => service.get('users');

export const apiGetUserList = (param) => {
  return service({
    url: '/users',
    method: 'GET',
    params: { pageSize: 1 },
  });
};
