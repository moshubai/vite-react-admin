import backOrderApi from '@/api/backOrder';
import TableView from '@/components/table-view/index.jsx';
import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryForm } from '../../../hooks/useUtil';
import SearchForm from '../common/SearchForm.jsx';
import TableButton from '../common/TableButton.jsx';
import { getColumns } from '../common/columns';

const orderState = {
  10: '待付款',
  11: '待仓库发货',
  12: '待买家收货',
  13: '待买家发货',
  14: '待仓库收货',
  15: '交易完成',
  20: '已取消',
  21: '退款中',
  22: '退款成功',
  23: '退货中',
  24: '退货成功',
};
const SyncNgInvent = () => {
  const tableRef = useRef();
  const navigate = useNavigate();
  //form数据
  const [formData, setFormData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  //请求到tabledata
  const [tableData, settableData] = useState({});

  // 分页
  const [formParams, setPostParams] = useState({
    pageNum: 1,
    pageSize: 20,
  });

  // 搜索
  const onSearchFn = (obj = {}) => {};

  //分页
  const pageHandlechange = (page) => {
    setPostParams({
      ...formParams,
      pageNum: page.pageIndex || 1,
      pageSize: page.pageSize,
    });
  };
  const { data, isFetching, refetch, status } = useQueryForm(
    `data-ordr-list${formParams.pageNo + formParams.pageSize}`,
    [formParams],
    backOrderApi.getOrderListInformation,
  );

  // 处理form数据
  // const formDataProcessing = (data={})=>{
  //   const {list} = data
  //   const dataSource = []
  //   list.forEach((item,index)=>{
  //     dataSource?.push(
  //       {
  //         number:item.number,
  //         createDate:item.createDate,
  //         status:orderState[item.status],
  //         orderType:item.orderType,
  //         memberName:item.memberName,
  //         memberType:item.memberType,
  //         memberAddress:item.memberAddress,
  //         memberLinkman:item.memberLinkman,
  //         memberLinkmanMobile:item.memberLinkmanMobile,
  //         quantity:item.orderProductList?.length && item.orderProductList[0].quantity,
  //         freightPrice:item.freightPrice,
  //         lineAmount: item.orderProductList?.length && item.orderProductList[0].lineAmount,
  //         id:item.id,
  //       }
  //     )
  //   })
  //   setDataSource([...dataSource])
  // }
  // useEffect(()=>{
  //   onSearchFn()
  // },[])
  const tableCallback = async (type, record) => {
    const { id } = record;
    navigate(`/order/list/details`, {
      push: true,
      state: {
        approvalId: id,
      },
    });
  };
  const columns = useMemo(() => getColumns(tableCallback), []);
  const fn = (record) => {
    return record.id;
  };
  return (
    <>
      <SearchForm onSearchFn={onSearchFn} />
      <TableButton />
      <TableView
        columnsFields={columns}
        ref={tableRef}
        bordered={false}
        rowKey="id"
        dataSource={data?.data?.list || []}
        total={data?.data?.total || 0}
        loading={isFetching}
        pageHandlechange={pageHandlechange}
        pageIndex={tableData.pageNum}
        scrollX={2000}
      />
    </>
  );
};
export default SyncNgInvent;
