import categoryReducer from './categoryReducer';
import postReducer from './postReducer';
import {combineReducers} from 'redux';

export default combineReducers({
  categoryReducer,
  postReducer
})
