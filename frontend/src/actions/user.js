import axios from 'axios';
import { setAlert } from './alert';
import {
  DELETE_USER,
  DELETE_USER_ERROR,
  GET_MY_ORDER_RESET,
  GET_USERS_LIST,
  GET_USERS_LIST_ERROR,
  GET_USERS_LIST_RESET,
  USER_DETAILS,
  USER_DETAILS_ERROR,
  USER_DETAILS_RESET,
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_REGISTER,
  USER_REGISTER_ERROR,
  USER_UPDATE,
  USER_UPDATE_ERROR,
  USER_UPDATE_PROFILE,
  USER_UPDATE_PROFILE_ERROR,
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
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: GET_MY_ORDER_RESET });
  dispatch({ type: GET_USERS_LIST_RESET });
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

export const getUserProfile = id => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_DETAILS_ERROR,
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

export const updateUserProfile = user => async (dispatch, getState) => {
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

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_UPDATE_PROFILE_ERROR,
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

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    const {
      user: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: GET_USERS_LIST,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_LIST_ERROR,
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

export const deleteUser = id => async (dispatch, getState) => {
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

    await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: DELETE_USER,
      payload: { id },
    });
  } catch (err) {
    dispatch({
      type: DELETE_USER_ERROR,
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

export const updateUser = user => async (dispatch, getState) => {
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

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: USER_UPDATE,
    });

    dispatch({
      type: USER_DETAILS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_UPDATE_ERROR,
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
