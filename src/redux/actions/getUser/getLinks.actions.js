import * as types from '../actionTypes';
import * as service from '../../../API/listApisServices';
import LogOut from '../../../components/LogOut';
import {loginReset} from '../login/login.action';

export const getLinkRequest = () => {
  return {
    type: types.TEST_LINKS.REQUEST,
  };
};

export const getLinkFailure = error => {
  return {
    type: types.TEST_LINKS.FAILURE,
    error,
  };
};

export const getLinkSuccess = data => {
  return {
    type: types.TEST_LINKS.SUCCESS,
    payload: data,
  };
};

export const getLinkDeatils = () => {
  return (dispatch, getState) => {
    dispatch(getLinkRequest());
    return service
      .getTestLinks()
      .then(json => {
        dispatch(getLinkSuccess(json));
        return Promise.resolve(json);
      })
      .catch(error => {
        if (error.toString().slice(39, 42) === '401') {
          LogOut();
          dispatch(loginReset(error));
          dispatch(getLinkFailure(error));
          return Promise.reject(error);
        } else {
          dispatch(getLinkFailure(error));
          return Promise.reject(error);
        }
      });
  };
};
