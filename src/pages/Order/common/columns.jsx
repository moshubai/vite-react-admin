import KAuthHoc from '@/components/KAuthHoc/index.js'
import { Button, Space } from 'antd'
import React from 'react'
export const getOperationType = (type) => {
  const typeInfo = ['新建', '绑定', '编辑', '修改', '批量导入', '批量修改商品']
  return typeInfo[type] ? typeInfo[type] : '-'
}
export const getApprovalStatus = (type) => {
  const typeInfo = ['', '', '审批通过', '审批拒绝', '批量审批通过', '批量审批拒绝']
  return typeInfo[type] ? typeInfo[type] : '-'
}
export const getColumns = (callback) => {
  return [
    {
      title: '编号',
      dataIndex: 'number',
      key: 'number',
      width:120,
      render: (text, record, index) => {
        return <>{record.number}</>
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      width:120,
      render: (text, record, index) => {
        return <>{record.createDate}</>
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width:120,
      render: (text, record, index) => {
        return <>{record.status}</>
      },
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      key: 'orderType',
      width:120,
      render: (text, record, index) => {
        return <>{record.orderType}</>
      },
    },
    {
      title: '经销商名称',
      dataIndex: 'memberName',
      key: 'memberName',
      width:120,
      render: (text, record, index) => {
        return <>{record.memberName}</>
      },
    },
    {
      title: '经销商类型',
      dataIndex: 'memberType',
      key: 'memberType',
      width:120,
      render: (text, record, index) => {
        return <>{record.memberType}</>
      },
    },

    {
      title: '经销商地址',
      dataIndex: 'memberAddress',
      key: 'memberAddress',
      width:120,
      render: (text, record, index) => {
        return <>{record.memberAddress}</>
      },
    },
    {
      title: '收货地址',
      dataIndex: 'shipAddress',
      key: 'shipAddress',
      width:120,
      render: (text, record, index) => {
        return <>{record.shipAddress}</>
      },
    },
    {
      title: '联系人',
      dataIndex: 'memberLinkman',
      key: 'memberLinkman',
      width:120,
      render: (text, record, index) => {
        return <>{record.memberLinkman}</>
      },
    },
    {
      title: '联系人电话',
      dataIndex: 'memberLinkmanMobile',
      key: 'memberLinkmanMobile',
      width:120,
      render: (text, record, index) => {
        return <>{record.memberLinkmanMobile}</>
      },
    },
    {
      title: '订购总数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width:120,
      render: (text, record, index) => {
        return <>{record.quantity}</>
      },
    },
    {
      title: '运费',
      dataIndex: 'freightPrice',
      key: 'freightPrice',
      width:120,
      render: (text, record, index) => {
        return <>{record.freightPrice}</>
      },
    },
    {
      title: '总金额',
      dataIndex: 'lineAmount',
      key: 'lineAmount',
      width:120,
      render: (text, record, index) => {
        return <>{record.lineAmount}</>
      },
    },
    {
      title: '操作',
      dataIndex: 'menuTotal',
      key: 'menuTotal',
      width: 100,
      render: (text, record, index) => {
        return (
          <Space size="small">
            {/* <KAuthHoc code="pc_menu_logsearch_godetail_button"> */}
              <Button type="text" onClick={() => callback('detail', record)}>
                查看详情
              </Button>
            {/* </KAuthHoc> */}
          </Space>
        )
      },
    },
  ]
}
