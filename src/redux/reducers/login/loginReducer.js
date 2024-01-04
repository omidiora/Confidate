import * as types from '../../actions/actionTypes';

const initialState = {
  requesting: false,
  success: false,
  error: false,
  logout: false,
  user: null,
  token: null,
  message: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER.REQUEST: {
      return {
        ...initialState,
        requesting: true,
      };
    }

    case types.LOGIN_USER.SUCCESS: {
      // console.log('pay', action.payload.data.token);
      return {
        ...state,
        success: true,
        requesting: false,
        user: action.payload.data ? action.payload.data : null,
        token: action.payload.data.token || null,
      };
    }

    case types.LOGIN_USER.FAILURE: {
      return {
        ...state,
        error: true,
        requesting: false,
        token: null,
      };
    }
    case types.LOGIN_USER.CACHED: {
      return {
        ...state,
        logout: true,
        requesting: false,
        success: false,
      };
    }

    default:
      return state;
  }
}
