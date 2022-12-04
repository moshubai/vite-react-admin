/**
 * 添加权限
 * */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Radio, Upload, message } from 'antd';
import 'moment/locale/zh-cn';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { apiAddAuthEdit, apiAddAuthItem } from '../../../../api/Authority';

const AddAccount = (props, ref) => {
  // const location = useLocation(); // 获取上一个页面传递进来的 state 参数  poskeyList
  const { recordParams } = props;
  const [form] = Form.useForm();
  const [isRemarkModal, setIsPassModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = async () => {
    await setIsPassModal(true);

    if (recordParams && recordParams.flag === 'edit') {
      form.setFieldsValue(recordParams);
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
    console.log('item', item); //log-xu
    setLoading(true);
    let params = {
      ...item,
    };
    let fn = apiAddAuthItem;
    if (recordParams && recordParams.flag === 'edit') {
      params.id = recordParams.id;
      params.parentId = recordParams.parentId ? recordParams.parentId : '0';
      fn = apiAddAuthEdit;
    }
    if (recordParams && recordParams.flag === 'next') {
      params.parentId = recordParams.id;
      fn = apiAddAuthItem;
    }
    fn(params)
      .then((res) => {
        console.log('res', res); //log-xu
        if (+res.code === 200) {
          message.success('成功');
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

  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Modal
      title={
        recordParams && recordParams.flag === 'edit'
          ? '编辑权限'
          : recordParams && recordParams.flag === 'look'
          ? '查看权限'
          : '新增权限'
      }
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
        <Form.Item name="name" label="权限名称" rules={[{ required: true, message: '请输入权限名称' }]}>
          <Input placeholder="请输入权限名称" />
        </Form.Item>
        <Form.Item name="code" label="code" rules={[{ required: true, message: '请输入code' }]}>
          <Input placeholder="请输入code" />
        </Form.Item>

        <Form.Item name="route" label="路由" rules={[{ required: true, message: '请输入路由' }]}>
          <Input placeholder="请输入路由" />
        </Form.Item>
        <Form.Item name="icon" label="icon">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>上传文件</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="url" label="url">
          {/* <Input placeholder="请输入route" /> */}
          <Input.TextArea placeholder="请输入" />
        </Form.Item>

        <Form.Item label="类型" name={'type'}>
          <Radio.Group>
            <Radio value="MENU"> MENU </Radio>
            <Radio value="BUTTON"> BUTTON </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default forwardRef(AddAccount);
