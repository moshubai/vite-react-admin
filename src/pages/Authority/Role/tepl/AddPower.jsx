/**
 * 添加备注
 * */
import { Button, Modal, Tabs, Tree, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { apiAddRoleAuthIds, apiAddRoleAuthority, apiGetAuthList } from '../../../../api/Authority';

const AddPower = (props, ref) => {
  const { recordParams } = props;
  const [isRemarkModal, setIsPassModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [powerTree, setPowerTree] = useState([]);
  // 回显权限
  const [checkedKeys, setCheckedKeys] = useState([]);

  const getPowerCheckout = async (roleId) => {
    await apiGetAuthList({ pageNo: 1, pageSize: 200 }).then((res) => {
      console.log('res', res); //log-xu
      const { code, data } = res;
      if (+code === 200) {
        setPowerTree(data.list);
      }
    });
    await apiAddRoleAuthIds({ roleId }).then((res) => {
      const { code, data } = res;
      if (+code === 200) {
        setCheckedKeys(data);
      }
    });
  };

  const showModal = async () => {
    await setIsPassModal(true);

    if (recordParams) {
      console.log('recordParamsrecordParamsrecordParams', recordParams); //log-xu
      const { id } = recordParams;
      getPowerCheckout(id);
    }
  };

  const endFinally = async (flag) => {
    await setLoading(false);
    await setIsPassModal(false);
    setTimeout(() => {
      props.closeModal(flag);
    }, 300);
  };
  const handleOkFn = async () => {
    let params = {
      roleId: recordParams.id,
      authorityIds: checkedKeys,
    };
    setLoading(true);
    apiAddRoleAuthority(params)
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

  const handleCancelFn = async () => {
    endFinally(false);
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      showModal();
    },
  }));

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
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
        <Button key="back" className="ant-btn-medium" onClick={handleCancelFn}>
          取消
        </Button>,
        <Button key="submit" type="primary" className="ant-btn-medium" onClick={handleOkFn} loading={loading}>
          确定
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
                  fieldNames={{
                    title: 'name',
                    key: 'id',
                  }}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={onSelect}
                  selectedKeys={selectedKeys}
                  treeData={powerTree}
                />
              ),
            };
          })}
        />
      </div>
    </Modal>
  );
};

export default forwardRef(AddPower);
