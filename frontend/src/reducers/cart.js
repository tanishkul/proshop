import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../actions/types';

const initialState = {
  cartItems: [],
  shippingAddress: {},
};

const cart = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        item => item.product === payload.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.product === existItem.product ? payload : item
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, payload] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => payload !== item.product),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };
    default:
      return state;
  }
};

export default cart;
