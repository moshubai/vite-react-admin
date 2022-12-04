import { render } from 'less'
import React, { useMemo, useRef, useState } from 'react'
import styles from '../components/index.module.less'
import TableView from '@/components/table-view/index.jsx'

const columns = [
  {
    title: '抬头',
    dataIndex: 'rise',
    key: 'rise',
    render: (text, record, index) => {
      return <><p>{record.rise}</p></>
    }
  },
  {
    title: '发票编号',
    dataIndex: 'code',
    key: 'code',
    render: (text, record, index) => {
      return <><p>{record.code}</p></>
    }
  },
  {
    title: '增值税号',
    dataIndex: 'dutyParagraph',
    key: 'dutyParagraph',
    render: (text, record, index) => {
      return <><p>{record.dutyParagraph}</p></>
    }
  },
  {
    title: '开票时间',
    dataIndex: 'time',
    key: 'time',
    render: (text, record, index) => {
      return <><p>{record.time}</p></>
    }
  },
  {
    title: '开票金额',
    dataIndex: 'amountMoney',
    key: 'amountMoney',
    render: (text, record, index) => {
      return <><p>{record.amountMoney}</p></>
    }
  },
]
const dataSource = [
  {
    rise:'xxx公司',
    code:'xxx',
    dutyParagraph:'xxx',
    time:'xxx',
    amountMoney:'xxx',
    id:1
  }
]
const Invoice = () => {
  return(
    <div className={styles['deliveryLogistics']}>
        <p className={styles['deliveryLogistics_header']}>
            <span className={styles['deliveryLogistics_header_title']}></span>
            <span className={styles['deliveryLogistics_header_text']}>基础信息</span>
        </p>
        <div className={styles['deliveryLogistics_table']}>
            <TableView 
                columnsFields={columns}
                dataSource={dataSource}
                usePagination={false}
            />
        </div>
    </div>
  )
}
export default Invoice