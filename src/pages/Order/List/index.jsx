import TableView from '@/components/table-view/index.jsx'
import React, { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getColumns } from '../common/columns'
import SearchForm from '../common/SearchForm.jsx'
import TableButton from '../common/TableButton.jsx'

const SyncNgInvent = () => {
  const tableRef = useRef()
  const navigate = useNavigate()

  const [exportLoading, setExportLoading] = useState(false)
  // 分页
  const [formParams, setPostParams] = useState({
    pageNo: 1,
    pageSize: 20,
  })

  // const { data, isFetching, refetch, status } = useQueryForm(
  //   `data-log-audit${formParams.pageNo + formParams.pageSize}`,
  //   [formParams],
  //   postInfoLog
  // );
  const pageHandlechange = (page) => {
    setPostParams({
      ...formParams,
      pageNo: page.pageIndex || 1,
      pageSize: page.pageSize,
    })
  }
  // 搜索
  const onSearchFn = (params) => {
    if (!params) {
      setPostParams({
        pageNo: 1,
        pageSize: 20,
      })
    } else {
      let ojb = {
        ...formParams,
        ...params,
        pageNo: 1,
      }
      setPostParams(ojb)
    }
    setTimeout(() => {
      refetch()
    }, 0)
  }

  const tableCallback = async (type, record) => {
    const { id, operationType } = record
    if (record.type === 1) {
      navigate(`/bp-data-audit-detail`, {
        push: true,
        state: {
          approvalId: id,
          type: operationType,
        },
      })
    } else {
      navigate(`/data-audit-detail`, {
        push: true,
        state: { approvalId: id, type: operationType },
      })
    }
  }
  const columns = useMemo(() => getColumns(tableCallback), [])
  const onSelectionChange = (selection, keys) => {
    console.log('已经选中的行', selection, keys)
    // setSelectCount(keys);
  }
  const tableProps = {
    selectionType: 'checkbox',
    onSelectionChange: onSelectionChange,
  }

  /**
   * @params {type}
   * */
  const postHandleButton = (type) => {
    // setExportLoading(true)
    // postLogExport(formParams).then((res) => {
    //   ExcelUtils.writeBlobExcelFile(res, `BP/GP审核记录`)
    //   setExportLoading(false)
    // })
  }

  return (
    <>
      <SearchForm onSearchFn={onSearchFn} />
      <TableButton postHandleButton={postHandleButton} exportLoading={exportLoading} />
      <TableView
        columnsFields={columns}
        dataSource={[]}
        total={0}
        ref={tableRef}
        rowKey="id"
        bordered={false}
        // loading={isFetching}
        pageHandlechange={pageHandlechange}
        pageIndex={formParams.pageNo}
        scrollX={1000}
      />
    </>
  )
}
export default SyncNgInvent
