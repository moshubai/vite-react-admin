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
      title: 'BP/GP编号',
      dataIndex: 'salesItemCode',
      key: 'salesItemCode',
      render: (text, record, index) => {
        return <>{record.salesItemCode}</>
      },
    },
    {
      title: 'BP/GP名称',
      dataIndex: 'gpNameEn',
      key: 'gpNameEn',
      render: (text, { nameCn, nameEn }, index) => {
        return (
          <div style={{ minWidth: 120 }}>
            中文：{nameCn}
            <br />
            英文：{nameEn}
          </div>
        )
      },
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      key: 'type',
      render: (text, record, index) => {
        return <div style={{ minWidth: 60 }}>{+record.type === 1 ? 'BP' : 'GP'}</div>
      },
    },
    {
      title: '操作类型',
      dataIndex: 'approvalStatus',
      key: 'approvalStatus',
      render: (text, record, index) => {
        return <div style={{ minWidth: 60 }}>{getApprovalStatus(+record.approvalStatus)}</div>
      },
    },
    {
      title: '审核时间',
      dataIndex: 'confirmTime',
      key: 'confirmTime',
      render: (text, record, index) => {
        return <div style={{ minWidth: 150 }}>{record.confirmTime}</div>
      },
    },
    {
      title: '审核人',
      dataIndex: 'confirmUser',
      key: 'confirmUser',
      render: (text, record, index) => {
        return <div style={{ minWidth: 80 }}>{record.confirmUser}</div>
      },
    },

    {
      title: '驳回原因',
      dataIndex: 'approvalReason',
      key: 'approvalReason',
      render: (text, record, index) => {
        return <div style={{ minWidth: 200 }}>{record.approvalReason}</div>
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
            <KAuthHoc code="pc_menu_logsearch_godetail_button">
              <Button type="text" onClick={() => callback('detail', record)}>
                查看详情
              </Button>
            </KAuthHoc>
          </Space>
        )
      },
    },
  ]
}
