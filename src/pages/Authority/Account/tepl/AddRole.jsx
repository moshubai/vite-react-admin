/**
 * 添加账户
 * */
import { Button, Form, Input, Modal, Select, message } from 'antd';
import 'moment/locale/zh-cn';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { apiAddOperatorRoles, apiGetAllRoles, apiGetRoles } from '../../../../api/Authority';

const AddRole = (props, ref) => {
  // const location = useLocation(); // 获取上一个页面传递进来的 state 参数  poskeyList
  const { recordParams } = props;
  const [form] = Form.useForm();
  const [isRemarkModal, setIsPassModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roleList, setRoleList] = useState([]);

  const getAllRolesList = async (accountId) => {
    await apiGetAllRoles().then((res) => {
      console.log('res', res); //log-xu
      const { code, data } = res;
      if (+code === 200) {
        setRoleList(data);
      }
    });
    await apiGetRoles({ id: accountId }).then((res) => {
      console.log('resres', res); //log-xu
      const { code, data } = res;
      if (+code === 200) {
        form.setFieldsValue({ roleIds: data });
      }
    });
  };

  const showModal = async () => {
    await setIsPassModal(true);
    if (recordParams) {
      form.setFieldsValue(recordParams);
      getAllRolesList(recordParams.id);
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
    const { roleIds } = item;

    let params = {
      operatorId: recordParams.id,
      roleIds,
    };

    setLoading(true);
    apiAddOperatorRoles(params)
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
      title={'设置角色'}
      open={isRemarkModal}
      onCancel={handleCancelFn}
      destroyOnClose={true}
      maskClosable={false}
      width={600}
      centered={true}
      footer={[
        <Button key="back" className="ant-btn-medium" onClick={handleCancelFn}>
          取消
        </Button>,
        <Button key="submit" type="primary" className="ant-btn-medium" onClick={handleOkFn} loading={loading}>
          确定
        </Button>,
      ]}
    >
      <Form {...layout} form={form} autoComplete="off" disabled={recordParams?.flag === 'look'}>
        <Form.Item name="userName" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="请输入用户名" disabled={true} />
        </Form.Item>
        <Form.Item name="roleIds" label="设置角色" rules={[{ required: true, message: '请选择角色' }]}>
          <Select mode="multiple" placeholder="请选择角色">
            {roleList.map((v) => {
              return (
                <Select.Option value={v.id} key={v.id}>
                  {v.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default forwardRef(AddRole);
