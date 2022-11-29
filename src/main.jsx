import { LoadingOutlined } from '@ant-design/icons';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import PageLayout from './layout/index';
import { routes } from './router/index';

export const Login = lazy(() => import('./pages/Login'));

const AuthRouter = () => {
  return <PageLayout />;
};

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<AuthRouter />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<Suspense fallback={<LoadingOutlined />}>{route.element}</Suspense>}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
