import TableView from '@/components/table-view/index.jsx';
import { QueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiDelAuthItem, apiGetAuthList } from '../../../api/Authority';
import { useQueryForm } from '../../../hooks/useUtil';
import AddAuth from './tepl/AddAuth';
import SearchForm from './tepl/SearchForm.jsx';
import TableButton from './tepl/TableButton';
import { getColumns } from './tepl/columns';

const SyncNgInvent = () => {
  const queryClient = new QueryClient();
  const tableRef = useRef();
  const addAuthRef = useRef();
  const navigate = useNavigate();

  const [addAuthModal, setAddAuthModal] = useState(false);
  const [recordParams, setRecordParams] = useState({});
  // 分页
  const [formParams, setPostParams] = useState({
    pageNo: 1,
    pageSize: 20,
  });

  const { data, isFetching, refetch, error, isError, isLoading } = useQueryForm(
    `authority-auth-${formParams.pageNo + formParams.pageSize}`,
    [formParams],
    apiGetAuthList,
  );
  const dataSource = useMemo(() => {
    if (isError) {
      console.log(error);
      return [];
    } else if (isLoading) {
      return [];
    }
    return data.data;
  }, [data, error, isError, isLoading]);
  const gettableInfo = async () => {
    queryClient.invalidateQueries();
    // setTimeout(() => {
    //   refetch();
    // }, 0);
  };
  // 刷新
  const isRefetch = async () => {
    setTimeout(() => {
      refetch();
    }, 0);
  };
  const closeModal = (flag) => {
    setAddAuthModal(false);
    gettableInfo();
    flag && isRefetch();
  };
  const pageHandlechange = (page) => {
    setPostParams({
      ...formParams,
      pageNo: page.pageIndex || 1,
      pageSize: page.pageSize,
    });
  };
  // 搜索
  const onSearchFn = (params) => {
    if (!params) {
      setPostParams({
        pageNo: 1,
        pageSize: 20,
      });
    } else {
      let ojb = {
        ...formParams,
        ...params,
        pageNo: 1,
      };
      setPostParams(ojb);
    }
    isRefetch();
  };

  const tableCallback = async (type, record) => {
    const newRecord = JSON.parse(JSON.stringify(record));
    const { id } = newRecord;
    console.log('newRecord', newRecord); //log-xu
    newRecord.flag = type;
    setRecordParams(newRecord);
    switch (type) {
      case 'look':
        setAddAuthModal(true);
        setTimeout(() => {
          addAuthRef.current.open();
        }, 0);
        break;
      case 'edit':
        setAddAuthModal(true);
        setTimeout(() => {
          addAuthRef.current.open();
        }, 0);
        break;
      case 'next':
        setAddAuthModal(true);
        setTimeout(() => {
          addAuthRef.current.open();
        }, 0);
        break;
      default:
        apiDelAuthItem({ id }).then((res) => {
          console.log('res', res); //log-xu
          const { code } = res;
          if (+code === 200) {
            message.success('删除成功');
            isRefetch();
          } else {
            message.error('删除失败');
          }
        });
        break;
    }
  };
  const columns = useMemo(() => getColumns(tableCallback), []);
  // const onSelectionChange = (selection, keys) => {
  //   console.log('已经选中的行', selection, keys);
  //   // setSelectCount(keys);
  // };
  // const tableProps = {
  //   selectionType: 'checkbox',
  //   onSelectionChange: onSelectionChange,
  // };

  /**
   * @params {type}
   * */
  const addHandleButton = (type) => {
    setRecordParams(null);
    setAddAuthModal(true);
    setTimeout(() => {
      addAuthRef.current.open();
    }, 0);
  };

  return (
    <>
      <SearchForm onSearchFn={onSearchFn} />
      <TableButton addHandleButton={addHandleButton} />
      <TableView
        columnsFields={columns}
        dataSource={dataSource?.list || []}
        total={dataSource?.total || 0}
        ref={tableRef}
        rowKey="id"
        size={'small'}
        bordered={false}
        loading={isFetching}
        pageHandlechange={pageHandlechange}
        pageIndex={formParams.pageNo}
        scrollX={1000}
      />
      {addAuthModal && <AddAuth ref={addAuthRef} recordParams={recordParams} closeModal={closeModal} />}
    </>
  );
};
export default SyncNgInvent;
