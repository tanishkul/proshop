import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from './types';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    const { _id, name, image, price, countInStock } = data;
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: _id,
        name,
        image,
        price,
        countInStock,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (err) {}
};

export const removeFromCart = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (err) {}
};

export const saveShippingAddress = data => async dispatch => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  } catch (err) {}
};

export const savePaymentMethod = data => async dispatch => {
  try {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  } catch (err) {}
};
