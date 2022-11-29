import SearchFormView from '@/components/search-view/index.jsx';
import { Button, Form, Input } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { memo } from 'react';

const SearchForm = (props) => {
  const { childType } = props;
  const [form] = Form.useForm();

  //   查询
  const onFinish = (value) => {
    let params = {
      ...value,
    };
    if (value.timeArr) {
      const { timeArr } = value;
      params.confirmTimeStart = moment(timeArr[0]).format('YYYY-MM-DD HH:mm:ss');
      params.confirmTimeEnd = moment(timeArr[1]).format('YYYY-MM-DD HH:mm:ss');
      delete params.timeArr;
    } else {
      params.confirmTimeStart = undefined;
      params.confirmTimeEnd = undefined;
    }
    console.log('value', value); //log-xu
    props.onSearchFn(params);
  };
  const onResetFn = () => {
    form.resetFields();
    props.onSearchFn(null);
  };
  return (
    <SearchFormView onFinish={onFinish} form={form}>
      <Form.Item label="角色代号" name="salesItemCode">
        <Input placeholder="请输入角色代号" allowClear />
      </Form.Item>
      <Form.Item label="角色名称" name="itemNameCn">
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
