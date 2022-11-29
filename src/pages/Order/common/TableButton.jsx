/**
 * 按钮
 * */
import { Button } from "antd";
import React, { memo } from "react";
const TableButton = (props) => {
  const { postHandleButton, exportLoading } = props;

  return (
      <Button
        type="primary"
        className="ant-btn-medium"
        style={{ marginBottom: 20 }}
        loading={exportLoading}
        onClick={() => {
          postHandleButton();
        }}
      >
        导出
      </Button>
  );
};

export default memo(TableButton);
