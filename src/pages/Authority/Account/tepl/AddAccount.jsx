/**
 * 添加账户
 * */
import { Button, DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
// import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import { forwardRef, useImperativeHandle, useState } from 'react';

// import { ngQueryInventory, ngEcQueryInventory } from "@/api/carriers-config.js";
const { TextArea } = Input;
const { Option } = Select;

const AddAccount = (props, ref) => {
  // const location = useLocation(); // 获取上一个页面传递进来的 state 参数  poskeyList
  const { poskeyList } = props;
  const [form] = Form.useForm();
  const [isRemarkModal, setIsPassModal] = useState(false);
  const [storeVal, setStoreVal] = useState('0');
  const [loading, setLoading] = useState(false);
  const [btnDis, setBtnDis] = useState(true);
  const [btnStoreDis, setBtnStoreDis] = useState(false);

  const showModal = async () => {
    await setStoreVal('0');
    await setIsPassModal(true);

    if (poskeyList) {
      form.setFieldsValue({ posKeys: poskeyList });
      setBtnDis(false);
      setBtnStoreDis(false);
    }
  };

  const endFinally = async (flag) => {
    await setLoading(false);
    await setIsPassModal(false);
    setTimeout(() => {
      props.closeModal(flag);
    }, 300);
  };
  // const addUpdataFn = ({ posKeys, storeIds }) => {
  //   let params = {
  //     posKeys: posKeys,
  //     storeIds: storeIds,
  //     batchNo: props?.batchNo,
  //   };
  //   setLoading(true);
  //   const fn = isECModules ? ngEcQueryInventory : ngQueryInventory;
  //   fn(params)
  //     .then((res) => {
  //       console.log(res);
  //       if (+res.code === 200) {
  //         message.success(res.data);
  //         endFinally(true);
  //       } else {
  //         message.error(res.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("err", err); //log-xu
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const handleOkFn = async () => {
    try {
      const row = await form.validateFields();
      console.log('validateFields success', row);
      // addUpdataFn(row);
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

  const onChange = ({ target: { value } }) => {
    setStoreVal(value);
    console.log('valuevaluevalue', value); //log-xu
    // if (+value === 1) {
    //   setBtnStoreDis(true);
    // } else {
    // setBtnStoreDis(false);
    // }
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      title="新增账户"
      open={isRemarkModal}
      onCancel={handleCancelFn}
      destroyOnClose={true}
      maskClosable={false}
      width={600}
      centered={true}
      footer={[
        <Button key="submit" type="primary" className="ant-btn-medium" onClick={handleOkFn} loading={loading}>
          确定
        </Button>,
        <Button key="back" className="ant-btn-medium" onClick={handleCancelFn}>
          取消
        </Button>,
      ]}
    >
      <Form {...layout} form={form} autoComplete="off">
        <Form.Item name="userName" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item label="性别" name={'sex'} rules={[{ required: true, message: '请选择性别' }]}>
          <Radio.Group>
            <Radio value="0"> 男 </Radio>
            <Radio value="1"> 女 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="mobile" label="手机号码" rules={[{ required: true, message: '请输入手机号码' }]}>
          <Input placeholder="请输入手机号码" />
        </Form.Item>
        <Form.Item name="address" label="公司" rules={[{ required: true, message: '请输入公司' }]}>
          <Input placeholder="请输入公司" />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item name="name" label="组织架构" rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item name="name" label="角色" rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
          <Input placeholder="请输入密码" />
        </Form.Item>
        <Form.Item name="name" label="有效日期" rules={[{ required: true, message: '请选择有效日期' }]}>
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
