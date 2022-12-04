import TableView from '@/components/table-view/index.jsx';
import React from 'react';

import styles from '../components/index.module.less';

const dataSource = [
  {
    code: '1',
    code1: '2',
    id: 1,
  },
  {
    code: '1',
    code1: '2',
    id: 2,
  },
  {
    code: '1',
    code1: '2',
    id: 3,
  },
  {
    code: '3',
    code1: '2',
    id: 4,
  },
];
const columns = [
  {
    title: '发货单编号',
    dataIndex: 'code',
    key: 'code',
    render: (text, record, index) => {
      return (
        <>
          <p>{record.code}</p>
        </>
      );
    },
    onCell: (_, index) => {
      // if(index == 1){
      //     return {
      //         rowSpan: 2,
      //     }
      // }
      // if(index == 2){
      //     return {
      //         rowSpan: 0,
      //     }
      // }
      if (index === 0) {
        return {
          rowSpan: dataSource?.length,
        };
      } else {
        return {
          rowSpan: 0,
        };
      }
    },
  },
  {
    title: '物流公司',
    dataIndex: 'code1',
    key: 'code1',
    render: (text, record, index) => {
      return (
        <>
          <p>{record.code1}</p>
        </>
      );
    },
  },
  // {
  //     title: '物流编号',
  //     dataIndex: 'code',
  //     key: 'code',
  //     render: (text, record, index) => {
  //       return <><p>{record.code}</p></>
  //     },
  // },
  // {
  //     title: '发货日期',
  //     dataIndex: 'code',
  //     key: 'code',
  //     render: (text, record, index) => {
  //       return <><p>{record.code}</p></>
  //     },
  // },
  // {
  //     title: '发货单状态',
  //     dataIndex: 'code',
  //     key: 'code',
  //     render: (text, record, index) => {
  //       return <><p>{record.code}</p></>
  //     },
  // },
  // {
  //     title: '发货仓库',
  //     dataIndex: 'code',
  //     key: 'code',
  //     render: (text, record, index) => {
  //       return <><p>{record.code}</p></>
  //     },
  // },
  // {
  //     title: '商品',
  //     dataIndex: 'code',
  //     key: 'code',
  //     render: (text, record, index) => {
  //       return <><p>{record.code}</p></>
  //     },
  // },
  // {
  //     title: '订单数量',
  //     dataIndex: 'code',
  //     key: 'code',
  //     render: (text, record, index) => {
  //       return <><p>{record.code}</p></>
  //     },
  // },
  // {
  //     title: '实发数量',
  //     dataIndex: 'code',
  //     key: 'code',
  //     render: (text, record, index) => {
  //       return <><p>{record.code}</p></>
  //     },
  // },
];

const DeliveryLogistics = () => {
  return (
    <div className={styles['deliveryLogistics']}>
      <p className={styles['deliveryLogistics_header']}>
        <span className={styles['deliveryLogistics_header_title']}></span>
        <span className={styles['deliveryLogistics_header_text']}>发货信息</span>
      </p>
      <div className={styles['deliveryLogistics_table']}>
        <TableView columnsFields={columns} dataSource={dataSource} usePagination={false} />
      </div>
    </div>
  );
};
export default DeliveryLogistics;
