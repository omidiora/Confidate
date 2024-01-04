const createActionTypes = prefix => {
  return ['REQUEST', 'SUCCESS', 'FAILURE', 'CACHED'].reduce((acc, type) => {
    return {...acc, [type]: `${prefix}_${type}`};
  }, {});
};

const createAPIActionTypes = prefix => {
  return ['REQUEST', 'SUCCESS', 'FAILURE', 'CACHED'].reduce((acc, type) => {
    return {...acc, [type]: `${prefix}_API_${type}`};
  }, {});
};

export const LOGIN_USER = createAPIActionTypes('LOGIN_USER');
export const ADD_USER = createAPIActionTypes('ADD_USER');
export const EMER_CONTACT = createAPIActionTypes('EMER_CONTACT');
export const EMER_MSG = createAPIActionTypes('EMER_MSG');
export const DATE_ENTRY = createAPIActionTypes('DATE_ENTRY');
export const GET_USER = createAPIActionTypes('GET_USER');
export const GET_CONTACT = createAPIActionTypes('GET_CONTACT');
export const GET_CON = createAPIActionTypes('GET_CON');
export const GET_CHAT = createAPIActionTypes('GET_CHAT');
export const TEST_LINKS = createAPIActionTypes('TEST_LINKS');
export const INIT_CHAT = createAPIActionTypes('INIT_CHAT');
