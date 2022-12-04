import React, { Suspense } from 'react';

import PageLoading from '../components/PageLoading/Index';
import {
  AccountList,
  AuthList,
  Dashboard,
  Exception403,
  Exception404,
  Exception500,
  OrderList,
  OrderDetails,
  RoleList,
} from './route';

export const routes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/home',
    element: <Dashboard />,
  },
  {
    path: '/order/list',
    element: (
      <Suspense fallback={<PageLoading />}>
        <OrderList />
      </Suspense>
    ),
  },
  {
    path: '/order/list/details',
    element: (
      <Suspense fallback={<PageLoading />}>
        <OrderDetails />
      </Suspense>
    ),
  },
  {
    path: '/order/details',
    element: (
      <Suspense fallback={<PageLoading />}>
        <RoleList />
      </Suspense>
    ),
  },
  {
    path: '/authority/roleList',
    element: (
      <Suspense fallback={<PageLoading />}>
        <RoleList />
      </Suspense>
    ),
  },
  {
    path: '/authority/accountList',
    element: (
      <Suspense fallback={<PageLoading />}>
        <AccountList />
      </Suspense>
    ),
  },
  {
    path: '/authority/authList',
    element: (
      <Suspense fallback={<PageLoading />}>
        <AuthList />
      </Suspense>
    ),
  },
  // {
  //   path: '/login',
  //   element: (
  //     <Suspense fallback={<PageLoading />}>
  //       <Login />
  //     </Suspense>
  //   ),
  // },

  {
    path: '/404',
    element: (
      <Suspense fallback={<PageLoading />}>
        <Exception404 />
      </Suspense>
    ),
  },
  {
    path: '/403',
    element: (
      <Suspense fallback={<PageLoading />}>
        <Exception403 />
      </Suspense>
    ),
  },
  {
    path: '/500',
    element: (
      <Suspense fallback={<PageLoading />}>
        <Exception500 />
      </Suspense>
    ),
  },
];
