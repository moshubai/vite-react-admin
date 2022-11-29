/**
 * 添加备注
 * */
import { Button, Form, Modal, Tabs, Tree } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

// import { ngQueryInventory, ngEcQueryInventory } from "@/api/carriers-config.js";

const AddPower = (props, ref) => {
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

  const treeData = [
    {
      title: '订单列表',
      key: '0-0',
      children: [
        {
          title: '列表',
          key: '0-0-0',
        },
        {
          title: '详情',
          key: '0-0-1',
        },
      ],
    },
    {
      title: '权限管理',
      key: '0-1',
      children: [
        {
          title: '角色管理',
          key: '0-1-0-0',
        },
        {
          title: '账户管理',
          key: '0-1-0-1',
        },
      ],
    },
  ];
  // const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
  // const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    // setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    // setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Modal
      title="设置权限"
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
      <div>
        <Tabs
          defaultActiveKey="1"
          centered
          size="small"
          items={['后台管理', '前端商城'].map((_, i) => {
            const id = String(i + 1);
            return {
              label: _,
              key: id,
              children: (
                <Tree
                  checkable
                  onExpand={onExpand}
                  // expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  // checkedKeys={checkedKeys}
                  onSelect={onSelect}
                  selectedKeys={selectedKeys}
                  treeData={treeData}
                />
              ),
            };
          })}
        />
      </div>
      {/* <Form {...layout} form={form} autoComplete="off">
        <Form.Item name="name" label="角色名称" rules={[{ required: true }]}>
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item name="code" label="code" rules={[{ required: true }]}>
          <Input placeholder="请输入code" />
        </Form.Item>

        <Form.Item label="是否禁用" name={'status'}>
          <Radio.Group>
            <Radio value="0"> 禁用 </Radio>
            <Radio value="1"> 启用 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="description" label="备注">
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
      </Form> */}
    </Modal>
  );
};

export default forwardRef(AddPower);
