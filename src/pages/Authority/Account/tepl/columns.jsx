import { Button, Space } from 'antd';
import React from 'react';

export const getOperationType = (type) => {
  const typeInfo = ['新建', '绑定', '编辑', '修改', '批量导入', '批量修改商品'];
  return typeInfo[type] ? typeInfo[type] : '-';
};
export const getApprovalStatus = (type) => {
  const typeInfo = ['', '', '审批通过', '审批拒绝', '批量审批通过', '批量审批拒绝'];
  return typeInfo[type] ? typeInfo[type] : '-';
};

export const getColumns = (callback) => {
  return [
    {
      title: '编号',
      dataIndex: 'employeeId',
      key: 'employeeId',
      render: (text, record, index) => {
        return <>{record.employeeId}</>;
      },
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '开始有效期',
      dataIndex: 'validStart',
      key: 'validStart',
    },
    {
      title: '截止有效期',
      dataIndex: 'validEnd',
      key: 'validEnd',
    },
    {
      title: '最近登录时间',
      dataIndex: 'confirmUser',
      key: 'confirmUser',
    },
    {
      title: '公司',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '修改人',
      dataIndex: 'modifier',
      key: 'modifier',
    },
    {
      title: '修改时间',
      dataIndex: 'updatedTime',
      key: 'updatedTime',
    },

    {
      title: '操作',
      dataIndex: 'menuTotal',
      key: 'menuTotal',
      width: 100,
      render: (text, record, index) => {
        return (
          <Space size="small">
            <Button type="text" onClick={() => callback('detail', record)}>
              查看
            </Button>
            <Button type="text" onClick={() => callback('detail', record)}>
              编辑
            </Button>
            <Button type="text" danger onClick={() => callback('detail', record)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
};
