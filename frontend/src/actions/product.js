import axios from 'axios';
import { setAlert } from './alert';
import { GET_PRODUCTS, GET_PRODUCT_DETAIL, PRODUCT_ERROR } from './types';

export const getProducts = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/products/');
    dispatch({
      type: GET_PRODUCTS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    const errorMessage = err.response && err.response.data.message;
    if (errorMessage) {
      dispatch(setAlert(errorMessage, 'danger'));
    }
  }
};

export const getProductDetail = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: GET_PRODUCT_DETAIL,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    const errorMessage = err.response && err.response.data.message;
    if (errorMessage) {
      dispatch(setAlert(errorMessage, 'danger'));
    }
  }
};
