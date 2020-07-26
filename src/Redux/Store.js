import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import RootReducer from './Reducers';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { NODE_ENV_PROD } from '../Constants';

const Store = props => {
  if (process.env.NODE_ENV === NODE_ENV_PROD) {
    // * Store creation production system
    const store = createStore(RootReducer, applyMiddleware(reduxThunk));
    return <Provider store={store}>{props.children}</Provider>;
  } else {
    // * Store creation development system
    const store = createStore(
      RootReducer,
      composeWithDevTools(applyMiddleware(reduxThunk))
    );
    return <Provider store={store}>{props.children}</Provider>;
  }
};

export default Store;
