import {
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_REGISTER,
  USER_REGISTER_ERROR,
} from '../actions/types';

const initialState = {
  loading: true,
  error: null,
  userInfo: null,
};

const user = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN:
    case USER_REGISTER:
      return { ...state, userInfo: payload, loading: false, error: null };
    case USER_LOGOUT:
      return { ...state, userInfo: null, loading: false };
    case USER_LOGIN_ERROR:
    case USER_REGISTER_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default user;
