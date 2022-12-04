import { css } from '@emotion/react';
import { Layout } from 'antd';
import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sider from './Sider';
import style from './index.module.less';

export const Login = lazy(() => import('../pages/Login'));

const styleContent = css({
  padding: 20,
  overflow: 'auto',
});

const PageLayout = () => {
  return (
    <div className={style.warpPage}>
      <Header />
      <Layout className={style.warpContent}>
        <Layout className={style.pagelayout}>
          <Sider />
          <Layout style={{ marginLeft: '15px', background: '#f0f2f5', paddingBottom: 15 }}>
            <Layout.Content css={styleContent}>
              <Outlet />
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default PageLayout;
