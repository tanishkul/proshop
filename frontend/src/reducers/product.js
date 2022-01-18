import {
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  CREATE_PRODUCT,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_RESET
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
    case DELETE_PRODUCT:
      return { ...state, success: true };
    case GET_PRODUCT_DETAIL:
      return { ...state, product: payload, loading: false };
    case CREATE_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
        successCreate: true,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
        successUpdate: true,
      };
    case PRODUCT_ERROR:
    case DELETE_PRODUCT_ERROR:
    case CREATE_PRODUCT_ERROR:
    case UPDATE_PRODUCT_ERROR:
      return { ...state, error: payload, loading: false };
    case CREATE_PRODUCT_RESET:
      return { ...state, successCreate: null };
    case UPDATE_PRODUCT_RESET:
      return { ...state, successUpdate: null };
    default:
      return state;
  }
};

export default product;
