import {
  GET_ORDER_BY_ID,
  GET_ORDER_BY_ID_ERROR,
  ORDER_CREATE_ERROR,
  ORDER_CREATE_SUCCESS,
  UPDATE_ORDER_TO_PAID,
  UPDATE_ORDER_TO_PAID_ERROR,
} from '../actions/types';

const initialState = {
  loading: true,
  orderItems: [],
  shippingAddress: {},
};

const order = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, order: payload, success: true };
    case GET_ORDER_BY_ID:
      return { ...state, loading: false, order: payload };
    case UPDATE_ORDER_TO_PAID:
      return { ...state, loading: false, success: true };
    case ORDER_CREATE_ERROR:
    case UPDATE_ORDER_TO_PAID_ERROR:
    case GET_ORDER_BY_ID_ERROR:
      return { ...state, loading: false, success: null, error: payload };
    default:
      return state;
  }
};

export default order;
