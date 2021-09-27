import { combineReducers } from 'redux';
import products from './product';
import alert from './alert';
import cart from './cart';

export default combineReducers({
  products,
  alert,
  cart,
});
