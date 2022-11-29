import { lazy } from 'react';

// export const Login = lazy(() => import('../pages/Login'));
export const Dashboard = lazy(() => import('../pages/Home'));

// export const PageLayout = lazy(() => import('@/layout/PageLayout.jsx'));
export const OrderList = lazy(() => import('@/pages/Order/List/index.jsx'));
export const RoleList = lazy(() => import('@/pages/Authority/Role/index.jsx'));
export const AccountList = lazy(() => import('@/pages/Authority/Account/index.jsx'));
export const AuthList = lazy(() => import('@/pages/Authority/Auth/index.jsx'));
// other
export const Exception404 = lazy(() => import('@/pages/Exception/404.jsx'));
export const Exception403 = lazy(() => import('@/pages/Exception/403.jsx'));
export const Exception500 = lazy(() => import('@/pages/Exception/500.jsx'));
