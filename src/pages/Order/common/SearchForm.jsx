import SearchFormView from '@/components/search-view/index.jsx';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
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
      <Form.Item label="BP编号" name="salesItemCode">
        <Input placeholder="请输入BP编号" allowClear />
      </Form.Item>
      <Form.Item label="BP中文名称" name="itemNameCn">
        <Input placeholder="请输入BP中文名称" allowClear />
      </Form.Item>
      <Form.Item label="GP编号" name="gpCode">
        <Input placeholder="请输入GP编号" allowClear />
      </Form.Item>
      <Form.Item label="GP中文名称" name="gpNameCn">
        <Input placeholder="请输入GP名称" allowClear />
      </Form.Item>
      <Form.Item label="数据类型" name="type">
        <Select placeholder="请选择" allowClear>
          <Select.Option value="null">全部</Select.Option>
          <Select.Option value="1">BP</Select.Option>
          <Select.Option value="2">GP</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="操作类型" name="searchType">
        <Select placeholder="请选择" allowClear>
          <Select.Option value="2">通过</Select.Option>
          <Select.Option value="4">批量通过</Select.Option>
          <Select.Option value="3">驳回</Select.Option>
          <Select.Option value="5">批量驳回</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="审核时间" name="timeArr">
        <DatePicker.RangePicker
          locale={locale}
          separator={'至'}
          placeholder={['开始日期', '结束日期']}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          style={{ width: 400 }}
        />
      </Form.Item>
      <Form.Item label="审核人" name="confirmUser">
        <Input placeholder="请输入审核人账号" allowClear />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="ant-btn-medium">
        查询
      </Button>
      <Button className="ant-btn-medium" style={{ marginLeft: '10px' }} onClick={onResetFn}>
        重置
      </Button>
    </SearchFormView>
  );
};
export default memo(SearchForm);
