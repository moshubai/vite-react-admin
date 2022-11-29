import React, { useState, useEffect } from "react";
import { Tag, Popover, Alert, Button } from "antd";
import { getKey } from "./utils";

export default function useSelection(_props) {
  const {
    rowKey,
    selectionType,
    onSelectionChange,
    selectShowKey,
    rowSelection,
  } = _props;

  // console.log("_props_props_props", _props); //log-xu
  const [selectionKeys, setSelectionKeys] = useState([]);
  const [selection, setSelection] = useState([]);

  let tableRowSelection = undefined;
  // 重点
  if (selectionType) {
    tableRowSelection = {
      ...rowSelection,
      type: selectionType,
      selectedRowKeys: selectionKeys,
      onSelect: (record, selected) => {
        if (selectionType === "radio") {
          changeRadioSelection(record);
        } else {
          selected ? addSelection(record) : removeSelection(null, record);
        }
      },
      onSelectAll: (selected, selectedRows = [], changeRows = []) => {
        selected
          ? addSelectionArray(selectedRows)
          : removeSelectionArray(changeRows);
      },
    };
  }

  /**
   * 清空所有选项
   */
  const clearSelection = () => {
    setSelectionKeys([]);
    setSelection([]);
  };

  /**
   * 设置选中的行
   */
  const setDefaultSelection = (selection) => {
    setSelection(selection);
    setSelectionKeys(selection.map((row) => getKey(row, rowKey)));
  };

  /**
   * 添加选项
   */
  const addDefaultSelection = (addSelection) => {
    let newSelection = [...selection];
    addSelection.forEach((row) => {
      if (!selectionKeys.includes(getKey(row, rowKey))) {
        newSelection.push(row);
      }
    });

    setSelection(newSelection);
    setSelectionKeys(newSelection.map((row) => getKey(row, rowKey)));
  };

  const changeRadioSelection = (row) => {
    let newKeys = [];
    let newSelection = [];

    newKeys.push(getKey(row, rowKey));
    newSelection.push(row);

    setSelectionKeys(newKeys);
    setSelection(newSelection);
  };

  /**
   * 添加选项（单个）
   * @param row 某一条选项
   */
  const addSelection = (row) => {
    let newKeys = [...selectionKeys];
    let newSelection = [...selection];
    newKeys.push(getKey(row, rowKey));
    newSelection.push(row);

    setSelectionKeys(newKeys);
    setSelection(newSelection);
  };

  /**
   * 添加选项（数组）
   * @param rows 项目列表
   */
  const addSelectionArray = (rows) => {
    let newKeys = [...selectionKeys];
    let newSelection = [...selection];

    rows.forEach((row) => {
      if (!row) {
        return;
      }
      let key = getKey(row, rowKey);
      if (!newKeys.includes(key)) {
        newKeys.push(key);
        newSelection.push(row);
      }
    });

    setSelectionKeys(newKeys);
    setSelection(newSelection);
  };

  /**
   * 移除某个选项
   * @param i 移除选项的 index
   */
  const removeSelection = (i, record) => {
    let newKeys = [...selectionKeys];
    let newSelection = [...selection];

    if (i === null && record) {
      i = newKeys.findIndex((key) => key === getKey(record, rowKey));
    }

    if (typeof i === "number") {
      newKeys.splice(i, 1);
      newSelection.splice(i, 1);
    }

    setSelectionKeys(newKeys);
    setSelection(newSelection);
  };

  /**
   * 移除一组选项
   * @param rows 移除选项
   */
  const removeSelectionArray = (rows) => {
    let newKeys = [...selectionKeys];
    let newSelection = [...selection];

    rows.forEach((row) => {
      let index = newKeys.findIndex((item) => item === getKey(row, rowKey));
      if (index >= 0) {
        newKeys.splice(index, 1);
        newSelection.splice(index, 1);
      }
    });

    setSelectionKeys(newKeys);
    setSelection(newSelection);
  };

  /** Popover 弹窗的提示 */
  const popContent = (
    <div>
      {selection.map((row, i) => {
        return (
          <Tag
            key={getKey(row, rowKey)}
            closable
            onClose={() => removeSelection(i)}
          >
            {row[selectShowKey || "name"]}
          </Tag>
        );
      })}
    </div>
  );

  const message = (
    <div>
      <span>
        已选择：
        <Popover title={"已经选中的选项"} content={popContent}>
          <span style={{ color: "#006241" }}>{selection.length}</span>
        </Popover>
        &nbsp; 条
      </span>

      <Button className="ml" type="link" size="small" onClick={clearSelection}>
        清空
      </Button>
    </div>
  );

  /** 头部已选中的提示 */
  const header = selectionKeys.length ? (
    <>
      <Alert message={message} showIcon />
      <div style={{ height: 20 }}></div>
    </>
  ) : (
    ""
  );

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selection, selectionKeys);
    }
  }, [selection]);

  return {
    header,
    message,
    tableRowSelection,
    selection,
    clearSelection,
    removeSelection,
    setSelection: setDefaultSelection,
    addSelection: addDefaultSelection,
  };
}
