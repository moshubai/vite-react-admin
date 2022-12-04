import SearchFormView from '@/components/search-view/index.jsx';
import { Button, Form, Input } from 'antd';
import 'moment/locale/zh-cn';
import React, { memo } from 'react';

const SearchForm = (props) => {
  const [form] = Form.useForm();

  //   查询
  const onFinish = (value) => {
    props.onSearchFn(value);
  };
  const onResetFn = () => {
    form.resetFields();
    props.onSearchFn(null);
  };
  return (
    <SearchFormView onFinish={onFinish} form={form}>
      <Form.Item label="角色代号" name="code">
        <Input placeholder="请输入角色代号" allowClear />
      </Form.Item>
      <Form.Item label="角色名称" name="name">
        <Input placeholder="请输入角色名称" allowClear />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        查询
      </Button>
      <Button style={{ marginLeft: '10px' }} onClick={onResetFn}>
        重置
      </Button>
    </SearchFormView>
  );
};
export default memo(SearchForm);
