import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import RootReducer from './Reducers';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { NODE_ENV_PROD } from '../Constants/';

const middlewares = [reduxThunk];

const Store = props => {
  if (process.env.NODE_ENV === NODE_ENV_PROD) {
    // * Store creation production system
    const store = createStore(RootReducer, applyMiddleware(...middlewares));
    return <Provider store={store}>{props.children}</Provider>;
  } else {
    // * Store creation development system
    const createStoreWithMiddleware = composeWithDevTools(
      applyMiddleware(...middlewares)
    )(createStore);

    const store = createStoreWithMiddleware(RootReducer);
    return <Provider store={store}>{props.children}</Provider>;
  }
};

export { Store, middlewares };
