import { combineReducers } from 'redux';
import products from './product';
import alert from './alert';

export default combineReducers({
  products,
  alert,
});
