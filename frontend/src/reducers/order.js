import {
  GET_MY_ORDER,
  GET_MY_ORDER_ERROR,
  GET_MY_ORDER_RESET,
  GET_ORDERS,
  GET_ORDERS_ERROR,
  GET_ORDER_BY_ID,
  GET_ORDER_BY_ID_ERROR,
  ORDER_CREATE_ERROR,
  ORDER_CREATE_SUCCESS,
  UPDATE_ORDER_TO_DELIVERED,
  UPDATE_ORDER_TO_DELIVERED_ERROR,
  UPDATE_ORDER_TO_DELIVERED_RESET,
  UPDATE_ORDER_TO_PAID,
  UPDATE_ORDER_TO_PAID_ERROR,
  UPDATE_ORDER_TO_PAID_RESET,
} from '../actions/types';

const initialState = {
  loading: true,
  orderItems: [],
  shippingAddress: {},
  order: null,
  myOrders: [],
  success: null,
  successPay: null,
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
    case GET_ORDERS:
      return { ...state, loading: false, orders: payload };
    case UPDATE_ORDER_TO_PAID:
      return { ...state, loading: false, successPay: true };
    case UPDATE_ORDER_TO_DELIVERED:
      return { ...state, loading: false, success: true };
    case ORDER_CREATE_ERROR:
    case UPDATE_ORDER_TO_PAID_ERROR:
    case UPDATE_ORDER_TO_DELIVERED_ERROR:
    case GET_ORDER_BY_ID_ERROR:
    case GET_MY_ORDER_ERROR:
    case GET_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        success: null,
        successPay: null,
        error: payload,
        orders: null,
        myOrders: null
      };
    case UPDATE_ORDER_TO_PAID_RESET:
    case UPDATE_ORDER_TO_DELIVERED_RESET:
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
        // order: null,
        myOrders: [],
      };
    default:
      return state;
  }
};

export default order;
