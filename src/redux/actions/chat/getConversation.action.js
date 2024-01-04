import * as types from '../actionTypes';
import * as service from '../../../API/listApisServices';
import LogOut from '../../../components/LogOut';
import {loginReset} from '../login/login.action';

export const getConRequest = () => {
  return {
    type: types.GET_CON.REQUEST,
  };
};

export const getConFailure = error => {
  return {
    type: types.GET_CON.FAILURE,
    error,
  };
};

export const getConSuccess = data => {
  return {
    type: types.GET_CON.SUCCESS,
    payload: data,
  };
};

export const getConrDeatils = (params, headers) => {
  return (dispatch, getState) => {
    dispatch(getConRequest());
    return service
      .getCon(params, headers)
      .then(json => {
        dispatch(getConSuccess(json));
        return Promise.resolve(json);
      })
      .catch(error => {
        console.log(error);
        if (error.toString().slice(39, 42) === '401') {
          // alert('Login session expired');
          // LogOut();
          // dispatch(loginReset());
          dispatch(getConFailure(error));
          return Promise.reject(error);
        } else {
          dispatch(getConFailure(error));
          return Promise.reject(error);
        }
      });
  };
};
