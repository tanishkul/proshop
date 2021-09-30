import {
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
  USER_UPDATE_PROFILE,
  USER_UPDATE_PROFILE_ERROR,
  USER_UPDATE_PROFILE_RESET,
} from '../actions/types';

const initialState = {
  loading: true,
  error: null,
  userInfo: null,
  user: null,
  users: [],
};

const user = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN:
    case USER_REGISTER:
      return { ...state, userInfo: payload, loading: false, error: null };
    case USER_DETAILS:
      return { ...state, user: payload, loading: false, error: null };
    case USER_UPDATE_PROFILE:
      return {
        ...state,
        success: true,
        userInfo: payload,
        loading: false,
        error: null,
      };
    case GET_USERS_LIST:
      return { ...state, users: payload, loading: false, error: null };
    case USER_UPDATE_PROFILE_RESET:
      return {
        ...state,
        success: null,
      };
    case USER_LOGOUT:
      return { ...state, userInfo: null, loading: false };
    case USER_LOGIN_ERROR:
    case USER_REGISTER_ERROR:
    case USER_DETAILS_ERROR:
    case USER_UPDATE_PROFILE_ERROR:
    case GET_USERS_LIST_ERROR:
      return { ...state, error: payload, loading: false };
    case USER_DETAILS_RESET:
      return {
        ...state,
        error: null,
        loading: false,
        user: null,
        success: null,
        userInfo: null,
      };
    case GET_USERS_LIST_RESET:
      return {
        ...state,
        error: null,
        loading: false,
        users: [],
      };
    default:
      return state;
  }
};

export default user;
