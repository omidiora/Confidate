import * as types from '../actionTypes';
import * as service from '../../../API/listApisServices';
import LogOut from '../../../components/LogOut';
import {loginReset} from '../login/login.action';

export const dateEntryRequest = () => {
  return {
    type: types.DATE_ENTRY.REQUEST,
  };
};

export const dateEntryFailure = error => {
  return {
    type: types.DATE_ENTRY.FAILURE,
    error,
  };
};

export const dateEntrySuccess = data => {
  return {
    type: types.DATE_ENTRY.SUCCESS,
    payload: data,
  };
};

export const dateEntryDeatils = (params, headers) => {
  return (dispatch, getState) => {
    dispatch(dateEntryRequest());
    return service
      .dateDetails(params, headers)
      .then(json => {
        dispatch(dateEntrySuccess(json));
        return Promise.resolve(json);
      })
      .catch(error => {
        if (error.toString().slice(39, 42) === '401') {
          // LogOut();
          // dispatch(loginReset(error));
          // alert('Login session expired');
          // dispatch(dateEntrytFailure(error));
          return Promise.reject(error);
        } else {
          dispatch(dateEntryFailure(error));
          return Promise.reject(error);
        }
      });
  };
};
