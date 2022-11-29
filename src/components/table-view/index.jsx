/**
 *
 * */
import { Pagination, Table } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import useSelection from "./useSelection";
// import { getComponents } from './EditableTable'

function TableView(props, ref) {
  const {
    columnsFields, // columns
    selectionType, // 是否选择，选择类型
    pagination, //自定义分页 {pageSize:10,pageIndex:1}
    rowKey = "id", //table key
    size, //
    scrollX,
    height,
    usePagination = true, // 是否需要分页
    onSelectionChange, // 选择回调
    selectShowKey, // 展示的key
    rowSelection,
    bordered,
    showAlert = false,
    editMode,
    //
    dataSource,
    total,
    loading,
    showQuickJumper = true,
    showSizeChanger = true,
    pageHandlechange,
    pageIndex,
    defaultPageSize = 20,
  } = props;

  const {
    header,
    message,
    tableRowSelection,
    selection,
    clearSelection,
    setSelection,
    addSelection,
    removeSelection,
  } = useSelection({
    rowKey,
    selectionType,
    onSelectionChange,
    selectShowKey,
    rowSelection,
  });

  const [loadParams, setLoadParams] = useState({
    pageSize: pagination?.pageSize || defaultPageSize,
    pageIndex: pagination?.pageIndex || 1,
  });
  // 是都开启编辑
  // const component = useMemo(() => {
  //   return getComponents(editMode)
  // }, [editMode])
  // 分页操作 等
  const handleTableChange = async (page, pageSize) => {
    let newParams = {
      pageSize: pageSize,
      pageIndex: page,
    };
    await setLoadParams(newParams);
    await pageHandlechange(newParams);
  };

  /**
   * 获得查询前的参数
   */
  const getApiParams = () => {
    let searchParams = {
      ...loadParams,
    };
    return searchParams;
  };

  useImperativeHandle(ref, () => ({
    /**
     * 清空选项
     */
    clearSelection() {
      clearSelection();
    },
    /**
     * 获取分页数据
     */
    getPageationData() {
      return loadParams;
    },

    getApiParams,
  }));
  return (
    <>
      {selectionType && showAlert && header}
      <Table
        bordered={bordered}
        columns={columnsFields}
        dataSource={dataSource}
        loading={loading}
        rowSelection={tableRowSelection}
        rowKey={rowKey}
        size={size}
        scroll={{ x: scrollX, y: height }}
        pagination={false}
      />
      {usePagination && (
        <div style={{ textAlign: "right", paddingTop: 20 }}>
          <Pagination
            total={total}
            current={pageIndex}
            showTotal={(total) => `总共 ${total} 条`}
            showQuickJumper={showQuickJumper}
            onChange={handleTableChange}
            defaultCurrent={1}
            showSizeChanger={showSizeChanger}
            defaultPageSize={defaultPageSize}
            pageSizeOptions={[20, 50, 100, 500]}
          />
        </div>
      )}
    </>
  );
}

export default forwardRef(TableView);
