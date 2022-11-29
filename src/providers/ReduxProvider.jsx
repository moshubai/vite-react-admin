import { Provider } from 'react-redux';

import { store } from '../redux';

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
