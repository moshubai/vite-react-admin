import { BellOutlined, LoginOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import React from 'react';

import style from '../index.module.less';

const Header = () => {
  return (
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
        <span style={{ color: '#fff' }}>
          <LoginOutlined />
        </span>
      </div>
    </div>
  );
};
export default Header;
