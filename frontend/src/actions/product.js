import axios from 'axios';
import { setAlert } from './alert';
import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_REVIEW,
  CREATE_PRODUCT_REVIEW_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  PRODUCT_ERROR,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_ERROR,
} from './types';

export const getProducts = (keyword = '') => async dispatch => {
  try {
    const { data } = await axios.get(`/api/products/?keyword=${keyword}`);
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

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: DELETE_PRODUCT,
    });
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_ERROR,
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

export const createProduct = product => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/`, {}, config);
    dispatch({
      type: CREATE_PRODUCT,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_PRODUCT_ERROR,
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

export const updateProduct = product => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/products/${product._id}`, product, config);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PRODUCT_ERROR,
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

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/reviews`, review, config);
    dispatch({
      type: CREATE_PRODUCT_REVIEW,
    });
  } catch (err) {
    dispatch({
      type: CREATE_PRODUCT_REVIEW_ERROR,
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
