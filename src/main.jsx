import { LoadingOutlined } from '@ant-design/icons';
import { Suspense, lazy } from 'react';
import { unstable_HistoryRouter as HistoryRouter, Navigate, Route, Routes } from 'react-router-dom';

import PageLayout from './layout/index';
import { routes } from './router/index';
import history from './utils/history';

export const Login = lazy(() => import('./pages/Login'));

const AuthRouter = () => {
  return <PageLayout />;
};

export const App = () => {
  return (
    <HistoryRouter history={history} basename={'/eorder-web'}>
      <Routes>
        {/* <Route path={'/'} element={<Navigate to="/home" replace />}></Route> */}
        <Route path={'/'} element={<Navigate to="/login" replace />}></Route>
        <Route path={'/login'} element={<Login />}></Route>
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
    </HistoryRouter>
  );
};
