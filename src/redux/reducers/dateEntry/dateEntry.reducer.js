import * as types from '../../actions/actionTypes';

const INITIAL_STATE = {
  dateEntryList: null,
  loggingIn: false,
  loggingOut: false,
  errorMessageLogin: null,
  errorMessageLogout: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.DATE_ENTRY.REQUEST: {
      return {
        ...state,
        errorMessageLogin: action.payload ? null : state.errorMessageLogin,
        errorMessageLogout: null,
        loggingIn: action.payload,
      };
    }

    case types.DATE_ENTRY.SUCCESS: {
      return {
        ...state,
        contactList: action.payload,
        errorMessageLogin: null,
      };
    }

    case types.DATE_ENTRY.FAILURE: {
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
