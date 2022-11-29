import { UnlockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Layout, message, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import '@/style/view-style/login.scss'
import style from './index.module.less';

const Login = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    // 这里可以做权限校验 模拟接口返回用户权限标识
    switch (values.username) {
      case 'admin':
        values.auth = 0;
        break;
      default:
        values.auth = 1;
    }

    localStorage.setItem('user', JSON.stringify(values));
    setLoading(true);
    setTimeout(() => {
      message.success('登录成功!');
      navigate('/');
    }, 2000);
  };

  useEffect(() => {
    notification.open({
      message: '欢迎使用后台管理平台',
      duration: null,
      description: '账号 admin(管理员) 其他(游客) 密码随意',
    });
    return () => {
      notification.destroy();
    };
  }, []);

  return (
    <Layout className={style['login']}>
      <div className={style['model']}>
        <div className={style['login-form']}>
          <h3>后台管理系统</h3>
          <Divider />
          <Form onFinish={handleSubmit}>
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
              <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
              <Input
                prefix={<UnlockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />
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
