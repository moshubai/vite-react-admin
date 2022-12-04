import service from '../service/request';
import { eOrder } from './config.js';

// 角色数据接口
export const apiGetRoleList = (param) => {
  return service({
    url: eOrder + '/sys/role/page',
    method: 'GET',
    params: param,
  });
};
// 修改角色
export const apiPutRole = (param) => {
  return service({
    url: eOrder + '/sys/role/edit',
    method: 'PUT',
    data: param,
  });
};
// 新增角色 /role/add
export const apiAddRole = (param) => {
  return service({
    url: eOrder + '/sys/role/add',
    method: 'POST',
    data: param,
  });
};
// 角色增加权限
export const apiAddRoleAuthority = (param) => {
  return service({
    url: eOrder + '/sys/role/addAuthority',
    method: 'POST',
    data: param,
  });
};
// 根据角色获取权限
export const apiAddRoleAuthIds = (param) => {
  return service({
    url: eOrder + '/sys/role/roleAuthIds',
    method: 'GET',
    params: param,
  });
};

// 获取所有权限
export const apiGetRoleAuthorityByUser = (param) => {
  return service({
    url: eOrder + '/sys/authority/getAuthorityByUser',
    method: 'GET',
    params: param,
  });
};

// 用户接口
export const apiGetOperatorList = (param) => {
  return service({
    url: eOrder + '/sys/operator/list',
    method: 'POST',
    data: param,
  });
};
// 删除用户接口
export const apiDelOperator = (param) => {
  return service({
    url: eOrder + '/sys/operator/delete',
    method: 'DELETE',
    params: param,
  });
};
// 编辑用户
export const apiEditRoleAuthority = (param) => {
  return service({
    url: eOrder + '/sys/operator/edit',
    method: 'POST',
    data: param,
  });
};

// 用户添加角色
export const apiAddOperatorRoles = (param) => {
  return service({
    url: eOrder + '/sys/operator/addRole',
    method: 'POST',
    data: param,
  });
};
// 用户添加
export const apiAddOperator = (param) => {
  return service({
    url: eOrder + '/sys/operator/add',
    method: 'POST',
    data: param,
  });
};

// 权限列表
export const apiGetAuthList = (param) => {
  return service({
    url: eOrder + '/sys/authority/page',
    method: 'GET',
    params: param,
  });
};
// 删除权限
export const apiDelAuthItem = (param) => {
  return service({
    url: eOrder + '/sys/authority/delete',
    method: 'DELETE',
    params: param,
  });
};
// 添加权限菜单
export const apiAddAuthItem = (param) => {
  return service({
    url: eOrder + '/sys/authority/add',
    method: 'POST',
    data: param,
  });
};
// 修改权限
export const apiAddAuthEdit = (param) => {
  return service({
    url: eOrder + '/sys/authority/edit',
    method: 'PUT',
    data: param,
  });
};

// 查询所有权限
export const apiGetAllAuth = (param) => {
  return service({
    url: eOrder + '/sys/authority/list',
    method: 'GET',
    data: param,
  });
};

// 查询所有角色
export const apiGetAllRoles = (param) => {
  return service({
    url: eOrder + '/sys/role/allRoles',
    method: 'GET',
  });
};
// 查询账号绑定角色
export const apiGetRoles = (param) => {
  return service({
    url: eOrder + '/sys/operator/getRolelist',
    method: 'GET',
    params: param,
  });
};
