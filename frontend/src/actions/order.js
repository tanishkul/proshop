import axios from 'axios';
import { setAlert } from './alert';
import { ORDER_CREATE_ERROR, ORDER_CREATE_SUCCESS } from './types';

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
