import TableView from '@/components/table-view/index.jsx';
import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiGetRoleList } from '../../../api/Authority';
import { useQueryForm } from '../../../hooks/useUtil';
import AddPower from './tepl/AddPower.jsx';
import AddRole from './tepl/AddRole.jsx';
import SearchForm from './tepl/SearchForm.jsx';
import TableButton from './tepl/TableButton';
import { getColumns } from './tepl/columns';

const SyncNgInvent = () => {
  const tableRef = useRef();
  const addRoleModalRef = useRef();
  const addPowerModalRef = useRef();
  const navigate = useNavigate();

  const [addModalFlag, setAddModalFlag] = useState(false);
  const [addModalPower, setAddModalPower] = useState(false);
  const [recordParams, setRecordParams] = useState({});
  // 分页
  const [formParams, setPostParams] = useState({
    pageNo: 1,
    pageSize: 20,
    code: '',
    name: '',
  });

  const { data, isFetching, isLoading, refetch, isError, error } = useQueryForm(
    `authority-role-${formParams.pageNo + formParams.pageSize}`,
    [formParams],
    apiGetRoleList,
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

  const isRefetch = async () => {
    setTimeout(() => {
      refetch();
    }, 0);
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
        code: '',
        name: '',
      });
    } else {
      let ojb = {
        code: '',
        name: '',
        ...formParams,
        ...params,
        pageNo: 1,
      };
      console.log('ojbojbojb', ojb); //log-xu
      setPostParams(ojb);
    }
    isRefetch();
  };

  const tableCallback = async (type, record) => {
    const newRecord = JSON.parse(JSON.stringify(record));
    console.log('newRecord', newRecord); //log-xu
    newRecord.flag = type;
    setRecordParams(newRecord);
    switch (type) {
      case 'power':
        setAddModalPower(true);
        setTimeout(() => {
          addPowerModalRef.current.open();
        }, 0);
        break;
      case 'edit':
        setAddModalFlag(true);
        setTimeout(() => {
          addRoleModalRef.current.open();
        });
        break;
      case 'del':
        break;

      default:
        setAddModalFlag(true);
        setTimeout(() => {
          addRoleModalRef.current.open();
        });
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
  const onSelectionChange = (selection, keys) => {
    console.log('已经选中的行', selection, keys);
    // setSelectCount(keys);
  };
  const tableProps = {
    selectionType: 'checkbox',
    onSelectionChange: onSelectionChange,
  };

  /**
   * @params {type}
   * */
  const addHandleButton = (type) => {
    setRecordParams(null);
    setAddModalFlag(true);
    setTimeout(() => {
      addRoleModalRef.current.open();
    });
  };

  const closeModal = (flag) => {
    setAddModalFlag(false);
    setAddModalPower(false);
    flag && isRefetch();
  };

  return (
    <>
      {/* <UserList /> */}
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

      {addModalFlag && <AddRole ref={addRoleModalRef} closeModal={closeModal} recordParams={recordParams} />}
      {addModalPower && <AddPower ref={addPowerModalRef} closeModal={closeModal} recordParams={recordParams} />}
    </>
  );
};
export default SyncNgInvent;
