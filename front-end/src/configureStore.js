import reducer from './reducers/combineReducers';
import thunk from 'redux-thunk';
import { createStore,applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const configureStore = () => createStore(reducer,
composeEnhancers(
  applyMiddleware(thunk)
  )
);
