import categoryReducer from './categoryReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import {combineReducers} from 'redux';

export default combineReducers({
  categoryReducer,
  postReducer,
  commentReducer
})
