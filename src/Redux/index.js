import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import RootReducer from './Reducers';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

const Store = props => {
  const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(reduxThunk))
  );

  return <Provider store={store}>{props.children}</Provider>;
};

export default Store;