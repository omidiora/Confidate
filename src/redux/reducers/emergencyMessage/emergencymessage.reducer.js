import * as types from '../../actions/actionTypes';

const INITIAL_STATE = {
  emerencyMessageList: null,
  loggingIn: false,
  loggingOut: false,
  errorMessageLogin: null,
  errorMessageLogout: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.EMER_MSG.REQUEST: {
      return {
        ...state,
        errorMessageLogin: action.payload ? null : state.errorMessageLogin,
        errorMessageLogout: null,
        loggingIn: action.payload,
      };
    }

    case types.EMER_MSG.SUCCESS: {
      return {
        ...state,
        contactList: action.payload,
        errorMessageLogin: null,
      };
    }

    case types.EMER_MSG.FAILURE: {
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
