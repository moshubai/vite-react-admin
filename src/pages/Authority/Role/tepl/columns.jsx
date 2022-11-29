import { Button, Popconfirm, Space } from 'antd';
import React from 'react';

// export const getOperationType = (type) => {
//   const typeInfo = ['新建', '绑定', '编辑', '修改', '批量导入', '批量修改商品'];
//   return typeInfo[type] ? typeInfo[type] : '-';
// };
// export const getApprovalStatus = (type) => {
//   const typeInfo = ['', '', '审批通过', '审批拒绝', '批量审批通过', '批量审批拒绝'];
//   return typeInfo[type] ? typeInfo[type] : '-';
// };
export const getColumns = (callback) => {
  return [
    {
      title: '角色代号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      // render: (text, { nameCn, nameEn }, index) => {
      //   return (
      //     <div style={{ minWidth: 120 }}>
      //       中文：{nameCn}
      //       <br />
      //       英文：{nameEn}
      //     </div>
      //   );
      // },
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '修改时间',
      dataIndex: 'modifier',
      key: 'modifier',
    },
    {
      title: '修改人',
      dataIndex: 'creator',
      key: 'creator',
    },

    {
      title: '操作',
      dataIndex: 'menuTotal',
      key: 'menuTotal',
      width: 100,
      render: (text, record, index) => {
        return (
          <Space size="small">
            <Button type="text" onClick={() => callback('power', record)}>
              设置权限
            </Button>
            <Button type="text" onClick={() => callback('edit', record)}>
              编辑
            </Button>
            <Popconfirm
              placement="topRight"
              title={'确定要删除吗？'}
              onConfirm={() => callback('del', record)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text">删除</Button>
            </Popconfirm>

            <Button type="text" onClick={() => callback('look', record)}>
              查看
            </Button>
          </Space>
        );
      },
    },
  ];
};
