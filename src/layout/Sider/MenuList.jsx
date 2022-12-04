import { DashboardOutlined, NotificationOutlined, OrderedListOutlined } from '@ant-design/icons';

export const menuItems = [
  { key: '/', label: '首页', icon: <DashboardOutlined /> },
  {
    key: '/order',
    label: '订单列表',
    icon: <OrderedListOutlined />,
    children: [
      {
        label: '订单列表',
        key: `/order/list`,
      },
      {
        label: '订单详情',
        key: `/order/details`,
      },
    ],
  },
  {
    label: '权限管理',
    key: `/authority`,
    icon: <NotificationOutlined />,
    children: [
      {
        label: '角色管理',
        key: '/authority/roleList',
      },
      {
        label: '账户管理',

        key: '/authority/accountList',
      },
      {
        label: '权限管理',
        key: '/authority/authList',
      },
    ],
  },
];
