import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types';

const initialState = {
  cartItems: [],
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
    default:
      return state;
  }
};

export default cart;
