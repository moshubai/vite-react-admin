/**
 * 添加备注
 * */
import { Button, Form, Input, Modal, Radio, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { apiAddRole, apiPutRole } from '../../../../api/Authority';

const AddRole = (props, ref) => {
  // const location = useLocation(); // 获取上一个页面传递进来的 state 参数  poskeyList
  const { recordParams } = props;
  const [form] = Form.useForm();
  const [isRemarkModal, setIsPassModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = async () => {
    await setIsPassModal(true);
    if (recordParams) {
      form.setFieldsValue(recordParams);
    } else {
      form.resetFields();
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
    let params = {
      ...item,
    };
    let fn = apiAddRole;
    if (recordParams && recordParams.flag === 'edit') {
      fn = apiPutRole;
      params.id = recordParams.id;
    }
    setLoading(true);
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
      title={
        recordParams && recordParams.flag === 'edit'
          ? '编辑角色'
          : recordParams && recordParams.flag === 'look'
          ? '查看'
          : '新增角色'
      }
      open={isRemarkModal}
      onCancel={handleCancelFn}
      destroyOnClose={true}
      maskClosable={false}
      width={600}
      centered={true}
      footer={
        recordParams && recordParams.flag === 'look'
          ? [
              <Button key="back" className="ant-btn-medium" onClick={handleCancelFn}>
                取消
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
      <Form {...layout} form={form} autoComplete="off" disabled={recordParams && recordParams.flag === 'look'}>
        <Form.Item name="code" label="code" rules={[{ required: true, message: '请输入code' }]}>
          <Input placeholder="请输入code" />
        </Form.Item>
        <Form.Item name="name" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item label="是否禁用" name={'status'} rules={[{ required: true, message: '请选择是否禁用' }]}>
          <Radio.Group>
            <Radio value="0"> 禁用 </Radio>
            <Radio value="1"> 启用 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="description" label="备注">
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default forwardRef(AddRole);
