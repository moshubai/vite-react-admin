import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/styles/main.less';
import { App } from './main';
import { Providers } from './providers';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Providers>
    <App />
  </Providers>,
);
