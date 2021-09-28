import { ORDER_CREATE_ERROR, ORDER_CREATE_SUCCESS } from '../actions/types';

const initialState = {
  loading: true,
};

const order = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, order: payload, success: true };
    case ORDER_CREATE_ERROR:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default order;
