import TableView from '@/components/table-view/index.jsx';
import { message } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiDelOperator, apiGetOperatorList } from '../../../api/Authority';
import { useQueryForm } from '../../../hooks/useUtil';
import AddAccount from './tepl/AddAccount.jsx';
import AddRole from './tepl/AddRole';
import SearchForm from './tepl/SearchForm.jsx';
import TableButton from './tepl/TableButton';
import { getColumns } from './tepl/columns';

const SyncNgInvent = () => {
  const tableRef = useRef();
  const addAccountRef = useRef();
  const addRoleRef = useRef();
  const navigate = useNavigate();

  const [addAcountModal, setAddAcountModal] = useState(false);
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [recordParams, setRecordParams] = useState({});
  // 分页
  const [formParams, setPostParams] = useState({
    pageNum: 1,
    pageSize: 20,
  });

  const { data, isFetching, refetch, error, isError, isLoading } = useQueryForm(
    `authority-account-${formParams.pageNum + formParams.pageSize}`,
    [formParams],
    apiGetOperatorList,
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
  // 刷新
  const isRefetch = async () => {
    setTimeout(() => {
      refetch();
    }, 0);
  };

  const pageHandlechange = (page) => {
    setPostParams({
      ...formParams,
      pageNum: page.pageIndex || 1,
      pageSize: page.pageSize,
    });
  };
  // 搜索
  const onSearchFn = (params) => {
    if (!params) {
      setPostParams({
        pageNum: 1,
        pageSize: 20,
      });
    } else {
      let ojb = {
        ...formParams,
        ...params,
        pageNum: 1,
      };
      setPostParams(ojb);
    }
    isRefetch();
  };

  const delItem = (id) => {
    apiDelOperator({ id }).then((res) => {
      console.log('res', res); //log-xu
      const { code } = res;
      if (+code === 200) {
        message.success('删除成功');
        isRefetch();
      } else {
        message.error('删除失败');
      }
    });
  };

  const tableCallback = async (type, record) => {
    const newRecord = JSON.parse(JSON.stringify(record));
    newRecord.flag = type;
    const { id } = newRecord;
    setRecordParams(newRecord);
    switch (type) {
      case 'look':
        setAddAcountModal(true);
        setTimeout(() => {
          addAccountRef.current.open();
        }, 0);
        break;
      case 'edit':
        setAddAcountModal(true);
        setTimeout(() => {
          addAccountRef.current.open();
        }, 0);
        break;
      case 'role':
        setAddRoleModal(true);
        setTimeout(() => {
          addRoleRef.current.open();
        }, 0);
        break;

      default:
        delItem(id);
        break;
    }
    // if (record.type === 1) {
    //   navigate(`/bp-data-audit-detail`, {
    //     push: true,
    //     state: {
    //       approvalId: id,
    //       type: operationType,
    //     },
    //   });
    // } else {
    //   navigate(`/data-audit-detail`, {
    //     push: true,
    //     state: { approvalId: id, type: operationType },
    //   });
    // }
  };
  const columns = useMemo(() => getColumns(tableCallback), []);
  // const onSelectionChange = (selection, keys) => {
  //   console.log('已经选中的行', selection, keys);
  // };
  // const tableProps = {
  //   selectionType: 'checkbox',
  //   onSelectionChange: onSelectionChange,
  // };

  /**
   * @params {type}
   * */
  const addHandleButton = () => {
    setRecordParams(null);
    setAddAcountModal(true);
    setTimeout(() => {
      addAccountRef.current.open();
    }, 0);
  };

  const closeModal = (flag) => {
    setAddAcountModal(false);
    flag && isRefetch();
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
        pageIndex={formParams.pageNum}
        scrollX={1000}
      />
      {addAcountModal && <AddAccount ref={addAccountRef} closeModal={closeModal} recordParams={recordParams} />}
      {addRoleModal && <AddRole ref={addRoleRef} closeModal={closeModal} recordParams={recordParams} />}
    </>
  );
};
export default SyncNgInvent;
