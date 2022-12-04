/**
 * 添加账户
 * */
import { Button, DatePicker, Form, Input, Modal, Radio, message } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { apiAddOperator, apiEditRoleAuthority } from '../../../../api/Authority';

const AddAccount = (props, ref) => {
  // const location = useLocation(); // 获取上一个页面传递进来的 state 参数  poskeyList
  const { recordParams } = props;
  const [form] = Form.useForm();
  const [isRemarkModal, setIsPassModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = async () => {
    await setIsPassModal(true);

    if (recordParams) {
      let params = {
        ...recordParams,
        validTime: [
          !recordParams.validStart ? '' : moment(recordParams.validStart),
          !recordParams.validEnd ? '' : moment(recordParams.validEnd),
        ],
      };
      form.setFieldsValue(params);
    }
  };

  const endFinally = async (flag) => {
    await setLoading(false);
    await setIsPassModal(false);
    setTimeout(() => {
      props.closeModal(flag);
    }, 300);
  };
  const addUpdataFn = (item) => {
    const { validTime } = item;

    let params = {
      ...recordParams,
      ...item,
      validEnd: moment(validTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      validStart: moment(validTime[1]).format('YYYY-MM-DD HH:mm:ss'),
    };

    setLoading(true);
    const fn = recordParams?.flag === 'edit' ? apiEditRoleAuthority : apiAddOperator;
    fn(params)
      .then((res) => {
        console.log(res);
        if (+res.code === 200) {
          message.success(res.data);
          endFinally(true);
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        console.log('err', err); //log-xu
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOkFn = async () => {
    try {
      const row = await form.validateFields();
      console.log('validateFields success', row);
      addUpdataFn(row);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleCancelFn = async () => {
    endFinally(false);
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      showModal();
    },
  }));

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      title={recordParams?.flag === 'look' ? '查看账户' : recordParams?.flag === 'edit' ? '编辑账户' : '新增账户'}
      open={isRemarkModal}
      onCancel={handleCancelFn}
      destroyOnClose={true}
      maskClosable={false}
      width={600}
      centered={true}
      footer={
        recordParams?.flag === 'look'
          ? [
              <Button key="back" className="ant-btn-medium" onClick={handleCancelFn}>
                关闭
              </Button>,
            ]
          : [
              <Button key="back" className="ant-btn-medium" onClick={handleCancelFn}>
                取消
              </Button>,
              <Button key="submit" type="primary" className="ant-btn-medium" onClick={handleOkFn} loading={loading}>
                确定
              </Button>,
            ]
      }
    >
      <Form {...layout} form={form} autoComplete="off" disabled={recordParams?.flag === 'look'}>
        <Form.Item name="userName" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="性别" name={'sex'}>
          <Radio.Group>
            <Radio value="0"> 男 </Radio>
            <Radio value="1"> 女 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="mobile"
          label="手机号码"
          rules={[
            { required: true, message: '请输入手机号码' },
            { minLength: 11, message: '手机号必须11位' },
            { pattern: new RegExp('^1[356789]\\d{9}$'), message: '请输入正确的手机号' },
          ]}
        >
          <Input placeholder="请输入手机号码" />
        </Form.Item>
        {/* <Form.Item name="address" label="公司" rules={[{ required: true, message: '请输入公司' }]}>
          <Input placeholder="请输入公司" />
        </Form.Item> */}
        <Form.Item name="email" label="邮箱">
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        {/* <Form.Item name="name" label="组织架构" rules={[{ required: true, message: '请输入组织架构' }]}>
          <Input placeholder="请输入组织架构" />
        </Form.Item> */}
        {/* <Form.Item name="name" label="角色" rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input placeholder="请输入邮箱" />
        </Form.Item> */}
        {recordParams?.flag !== 'look' && (
          <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
        )}

        <Form.Item name="validTime" label="有效日期" rules={[{ required: true, message: '请选择有效日期' }]}>
          <DatePicker.RangePicker
            locale={locale}
            separator={'至'}
            placeholder={['开始日期', '结束日期']}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>

        <Form.Item name="description" label="备注">
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default forwardRef(AddAccount);
