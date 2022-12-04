import { BellOutlined, LoginOutlined } from '@ant-design/icons';
import { Avatar, Image, Modal, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiLoginOut } from '../../api/login';
import { removeCookies } from '../../utils/cookie';
import style from '../index.module.less';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const closeHandle = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    apiLoginOut().then((res) => {
      console.log('res'); //log-xu
      const { code } = res;
      if (+code === 200) {
        message.success('登出成功');
        removeCookies('token');
        setIsModalOpen(false);
        navigate('/login');
      } else {
        message.error('登出失败');
        setIsModalOpen(false);
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={style.warpHearder}>
        <div className={style.warpLogo}>Logo</div>
        <div className={style.warpRight}>
          <span style={{ color: '#fff' }}>
            <BellOutlined />
          </span>
          <span style={{ color: '#fff' }}>
            <Avatar
              src={
                <Image
                  src="https://joeschmoe.io/api/v1/random"
                  style={{
                    width: 24,
                    marginRight: 15,
                  }}
                />
              }
            />
            <span style={{ marginLeft: 10, fontSize: 16 }}>墨书白</span>
          </span>
          <span style={{ color: '#fff' }} onClick={closeHandle}>
            <LoginOutlined />
          </span>
        </div>
      </div>
      <Modal title="温馨提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        确认退出后台管理系统？
      </Modal>
    </>
  );
};
export default Header;
