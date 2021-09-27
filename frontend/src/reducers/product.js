import {
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS,
  PRODUCT_ERROR,
} from '../actions/types';

const initialState = {
  products: [],
  product: { reviews: [] },
  loading: true,
  error: null,
};

const product = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return { ...state, products: payload, loading: false };
    case GET_PRODUCT_DETAIL:
      return { ...state, product: payload, loading: false };
    case PRODUCT_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default product;
