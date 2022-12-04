/**
 * 按钮
 * */
import { Button } from 'antd';
import React, { memo } from 'react';

const TableButton = (props) => {
  const { addHandleButton, addLoading } = props;

  return (
    <Button
      type="primary"
      className="ant-btn-medium"
      style={{ marginBottom: 20 }}
      loading={addLoading}
      onClick={() => {
        addHandleButton();
      }}
    >
      新增权限
    </Button>
  );
};

export default memo(TableButton);
