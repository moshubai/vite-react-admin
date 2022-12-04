import { Button, Popconfirm, Space } from 'antd';
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
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => {
        return <>{record.name}</>;
      },
    },
    {
      title: 'code',
      dataIndex: 'code',
      key: 'code',
    },

    {
      title: '操作',
      dataIndex: 'menuTotal',
      key: 'menuTotal',
      width: 100,
      render: (text, record, index) => {
        return (
          <Space size="small">
            <Button type="link" onClick={() => callback('look', record)}>
              查看
            </Button>
            <Button type="link" onClick={() => callback('edit', record)}>
              编辑
            </Button>
            <Button type="link" onClick={() => callback('next', record)}>
              添加下级
            </Button>
            <Popconfirm placement="topRight" title={'是否确认删除该权限？'} onConfirm={() => callback('del', record)}>
              <Button type="link" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
};
