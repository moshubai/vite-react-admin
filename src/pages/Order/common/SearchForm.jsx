import SearchFormView from '@/components/search-view/index.jsx'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import moment from 'moment'
import React, { memo } from 'react'

const stateOptions = [
  {label:"待付款",value:10},
  {label:"待仓库发货",value:11},
  {label:"待买家收货",value:12},
  {label:"待买家发货",value:13},
  {label:"待仓库收货",value:14},
  {label:"交易完成",value:15},
  {label:"已取消",value:20},
  {label:"退款中",value:21},
  {label:"退款成功",value:22},
  {label:"退货中",value:23},
  {label:"退货成功",value:24},
]
const typeOptions = [
  {label:"全部",value:1},
  {label:"常规订单",value:2},
  {label:"预订单",value:3},
]
const SearchForm = (props) => {
  const { onSearchFn } = props
  const [form] = Form.useForm()

  const formContent = [
    {
      label:"订单编号",
      name: "id",
      value: (
        <Input allowClear/>
      )
    },
    {
      label:"创建时间",
      name: "time",
      value: (
        <DatePicker.RangePicker 
          showTime
          placeholder={[]}
          format={'YYYY-MM-DD'}
        />
      )
    },
    {
      label:"订单状态",
      name: "status",
      value: (
        <Select 
          options={stateOptions}
          placeholder='全部'
          style={{width:111}}
        />
      )
    },
    {
      label:"经销商代码",
      name: "memberCode",
      value: (
        <Input allowClear/>
      )
    },
    {
      label:"订单类型",
      name: "orderType",
      value: (
        <Select 
          options={typeOptions}
          placeholder='全部'
          style={{width:111}}
        />
      )
    },
    {
      label:"经销商名称",
      name: "memberName",
      value: (
        <Input allowClear/>
      )
    },
  ]
    //   查询
  const onFinish = (value) => {
    let params = {
      ...value,
    }
    if(value.time){
      params.startCreateDate = value.time[0].format('YYYY-MM-DD')
      params.endCreateDate = value.time[1].format('YYYY-MM-DD')
    }
    delete params.time
    let obj = {
      params
    }
    onSearchFn(obj)
  }
  const onResetFn = () => {
    form.resetFields()
    onSearchFn()
  }
  return (
    <SearchFormView onFinish={onFinish} form={form}>
      {
        formContent.map((item,index)=>[
          <Form.Item
            key={index}
            name={item.name}
            label={item.label}
          >
            {item.value}
          </Form.Item>
        ])
      }
      <Button type="primary" htmlType="submit" className="ant-btn-medium">
        查询
      </Button>
      <Button className="ant-btn-medium" style={{ marginLeft: '10px' }} onClick={onResetFn}>
        重置
      </Button>
    </SearchFormView>
  )
}
export default memo(SearchForm)
