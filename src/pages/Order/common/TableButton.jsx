/**
 * 按钮
 * */
import KAuthHoc from "@/components/KAuthHoc/index.js";
import { Button } from "antd";
import React, { memo } from "react";
const TableButton = (props) => {
  const { postHandleButton, exportLoading } = props;

  return (
    // <KAuthHoc>
      <Button
        type="primary"
        className="ant-btn-medium"
        style={{ marginBottom: 20}}
        loading={exportLoading}
        onClick={() => {
          postHandleButton();
        }}
      >
        导出
      </Button>
    // </KAuthHoc>
  );
};

export default memo(TableButton);
