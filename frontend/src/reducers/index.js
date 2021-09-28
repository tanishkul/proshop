import { combineReducers } from 'redux';
import products from './product';
import alert from './alert';
import cart from './cart';
import user from './user';
import order from './order';

export default combineReducers({
  products,
  alert,
  cart,
  user,
  order,
});
