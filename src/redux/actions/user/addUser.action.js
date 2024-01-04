import * as types from "../actionTypes";
import * as service from "../../../API/adduser.Service"

export const addUserRequest = () => {
    
    return {
        type: types.ADD_USER.REQUEST
    
    };
};

export const addUserFailure = error => {
    return {
        type: types.ADD_USER.FAILURE,
        error
    };
};

export const addUserSuccess = () => {
    return {
        type: types.ADD_USER.SUCCESS
    };
};

export const addUser = params => {
    return (dispatch, getState) => {
        dispatch(addUserRequest());
        return service.post(params)
            .then(json => {
                dispatch(addUserSuccess(json));
                return Promise.resolve(json);
            })
            .catch(error => {
                dispatch(addUserFailure(error));
                return Promise.reject(error);
            });
    };
};

console.log('add' ,addUser)
