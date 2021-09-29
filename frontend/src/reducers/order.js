import {
  GET_MY_ORDER,
  GET_MY_ORDER_ERROR,
  GET_MY_ORDER_RESET,
  GET_ORDER_BY_ID,
  GET_ORDER_BY_ID_ERROR,
  ORDER_CREATE_ERROR,
  ORDER_CREATE_SUCCESS,
  UPDATE_ORDER_TO_PAID,
  UPDATE_ORDER_TO_PAID_ERROR,
  UPDATE_ORDER_TO_PAID_RESET,
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
    case GET_MY_ORDER:
      return { ...state, loading: false, myOrders: payload };
    case UPDATE_ORDER_TO_PAID:
      return { ...state, loading: false, successPay: true };
    case ORDER_CREATE_ERROR:
    case UPDATE_ORDER_TO_PAID_ERROR:
    case GET_ORDER_BY_ID_ERROR:
    case GET_MY_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        success: null,
        successPay: null,
        error: payload,
      };
    case UPDATE_ORDER_TO_PAID_RESET:
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        successPay: null,
      };
    case GET_MY_ORDER_RESET:
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        successPay: null,
        order: null,
        myOrders: [],
      };
    default:
      return state;
  }
};

export default order;
