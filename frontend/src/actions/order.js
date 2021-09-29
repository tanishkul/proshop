import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ORDER_BY_ID,
  GET_ORDER_BY_ID_ERROR,
  ORDER_CREATE_ERROR,
  ORDER_CREATE_SUCCESS,
  UPDATE_ORDER_TO_PAID,
  UPDATE_ORDER_TO_PAID_ERROR,
} from './types';

export const createOrder = order => async (dispatch, getState) => {
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

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_ERROR,
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

export const getOrderById = id => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: GET_ORDER_BY_ID,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ORDER_BY_ID_ERROR,
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

export const updateOrderToPaid =
  (id, paymentResult) => async (dispatch, getState) => {
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

      const { data } = await axios.put(
        `/api/orders/${id}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: UPDATE_ORDER_TO_PAID,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_TO_PAID_ERROR,
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
