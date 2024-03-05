import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

import createStore from './createStore';

const WrappedElement = ({ element }: { element: ReactNode }) => {
  const store = createStore();

  return <Provider store={store}>{element}</Provider>;
};

export default WrappedElement;
