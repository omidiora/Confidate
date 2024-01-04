import * as types from '../../actions/actionTypes';

const INITIAL_STATE = {
  getId: null,
  loggingIn: false,
  loggingOut: false,
  errorMessageLogin: null,
  errorMessageLogout: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.INIT_CHAT.REQUEST: {
      return {
        ...state,
        errorMessageLogin: action.payload ? null : state.errorMessageLogin,
        errorMessageLogout: null,
        loggingIn: action.payload,
      };
    }

    case types.INIT_CHAT.SUCCESS: {
      return {
        ...state,
        getId: action.payload,
        errorMessageLogin: null,
      };
    }

    case types.INIT_CHAT.FAILURE: {
      return {
        ...state,
        loggingIn: false,
        errorMessageLogin: action.payload,
      };
    }

    default:
      return state;
  }
}
