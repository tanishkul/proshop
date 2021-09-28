import axios from 'axios';
import { setAlert } from './alert';
import {
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_REGISTER,
  USER_REGISTER_ERROR,
} from './types';

export const login = (email, password) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_ERROR,
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

export const logout = () => async dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_ERROR,
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
