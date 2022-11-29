import service from '../service/request';

// 角色数据接口
export const apiGetRoleList = (param) => {
  return service({
    url: '/role/page',
    method: 'GET',
    data: param,
  });
};
// 修改角色
export const apiPutRole = (param) => {
  return service({
    url: '/role/edit',
    method: 'PUT',
    data: param,
  });
};
// 新增角色 /role/add
export const apiAddRole = (param) => {
  return service({
    url: '/role/add',
    method: 'POST',
    params: param,
  });
};
// 角色增加权限
export const apiAddRoleAuthority = (param) => {
  return service({
    url: '/role/addAuthority',
    method: 'POST',
    params: param,
  });
};

// 用户接口
export const apiGetOperatorList = (param) => {
  return service({
    url: '/operator/page',
    method: 'GET',
    data: param,
  });
};
// 删除用户接口
export const apiDelOperator = (param) => {
  return service({
    url: '/operator/delete',
    method: 'DELETE',
    data: param,
  });
};
// 编辑用户
export const apiEditRoleAuthority = (param) => {
  return service({
    url: '/operator/edit',
    method: 'POST',
    params: param,
  });
};

// 用户添加角色
export const apiAddOperatorRoles = (param) => {
  return service({
    url: '/operator/addRole',
    method: 'POST',
    params: param,
  });
};
// 用户添加
export const apiAddOperator = (param) => {
  return service({
    url: '/operator/add',
    method: 'POST',
    params: param,
  });
};
