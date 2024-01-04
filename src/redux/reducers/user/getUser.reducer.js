import * as types from '../../actions/actionTypes';

const INITIAL_STATE = {
  user: null,
  token: null,
  loggingIn: false,
  loggingOut: false,
  errorMessageLogin: null,
  errorMessageLogout: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_USER.REQUEST: {
      return {
        ...state,
        errorMessageLogin: action.payload ? null : state.errorMessageLogin,
        errorMessageLogout: null,
        loggingIn: action.payload,
      };
    }

    case types.GET_USER.SUCCESS: {
      console.log('payProfile', action.payload);
      return {
        ...state,
        user: action.payload,
        errorMessageLogin: null,
      };
    }

    case types.GET_USER.FAILURE: {
      console.log('failyr', action.payload);
      return {
        ...state,
        loggingIn: false,
        errorMessageLogin: action.payload,
        loggingOut: true,
      };
    }
    case types.GET_USER.CACHED: {
      console.log('failyr', action.payload);
      return {
        ...state,
        loggingIn: false,
        errorMessageLogin: action.payload,
        loggingOut: true,
      };
    }

    default:
      return state;
  }
}
