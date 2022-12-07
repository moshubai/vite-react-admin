import { UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Layout, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiLogin } from '../../api/login';
import { setCookies } from '../../utils/cookie';
import style from './index.module.less';

const Login = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values) => {
    setLoading(true);
    apiLogin(values).then((res) => {
      console.log('====================================');
      console.log(res);
      const { code, data } = res;
      if (+code === 200) {
        setCookies('token', data.accessToken);
        setTimeout(() => {
          message.success('登录成功!');
          setLoading(false);

          navigate('/home');
        }, 0);
      } else {
        message.error(res.message);
        setLoading(false);
      }
    });
  };

  return (
    <Layout className={style['login']}>
      <div className={style['model']}>
        <div className={style['login-form']}>
          <h3>后台管理系统</h3>
          <Divider />
          <Form onFinish={handleSubmit}>
            <Form.Item name="userName" rules={[{ required: true, message: '请输入用户名!' }]}>
              <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
              <Input prefix={<UnlockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}  type="password" placeholder="密码"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
