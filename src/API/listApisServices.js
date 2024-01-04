import {
  BASE_URL,
  REQUEST_OTP,
  VERIFY_OTP,
  UPDATE_PASSWORD,
  UPDATE_CONTACTS,
  GET_USER,
  UPDATE_USER,
  GET_MESSAGES,
  ADD_MESSAGES,
  ACTIVE_MESSAGES,
  GET_CONTACTS,
  ADD_CONTACTS,
  DELETE_MESSAGES,
  DELETE_CONTACTS,
  DATE_ENTRY,
  DATE_DETAILS,
  LOCATION_HISTORY,
  UPADATE_HISTORY,
  FIND_CONTACT,
  GET_CONVERSATION,
  CREATE_CONVERSATION,
  GET_CHAT,
  SEND_CHAT,
  TEST_LINKS,
  PROFILE_UPLOAD,
  DELETE_CONVERSATION,
  CHANGE_PASSWORD,
  TRACK_LOCATION,
  LOCATION_DATA,
} from './constants';
import axios from 'axios';
import {statusParsing, jsonParsing} from './utilis';
import {useSelector} from 'react-redux';

export const getProfile = headers => {
  return axios
    .get(`${BASE_URL}${GET_USER}`, {headers})
    .then(statusParsing)
    .then(jsonParsing)
    .catch(err => console.log('err', err));
};

export const updateProfile = (params = {}, headers) => {
  return axios
    // .post(`${BASE_URL}${UPDATE_USER}`, params, {headers})
    .put(`https://api.confidateapp.com/api/updateProfile`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);
};
// Messages
export const getMessage = (params = {}, headers) => {
  console.log('gedar', headers);
  return axios
    // .post(`${BASE_URL}${GET_MESSAGES}`, params, {headers})
    .post(`https://api.confidateapp.com/api/getMessage`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);
};
export const addMessage = (params = {}, headers) => {
  return axios
    // .post(`${BASE_URL}${ADD_MESSAGES}`, params, {headers})
    .post(`https://api.confidateapp.com/api/messageCreate`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing)
    .catch(err => console.log('err', err));
};
export const activateMessage = (params = {}, headers) => {
  return axios
    .post(`${BASE_URL}${ACTIVE_MESSAGES}`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing)
    .catch(err => console.log('err', err));
};
export const deleteMessages = (params = {}, headers) => {
  return axios
    // .post(`${BASE_URL}${DELETE_MESSAGES}`, params, {headers})
    .delete(`https://api.confidateapp.com/api/deleteMessage/${params.id}`, {headers})
    .then(statusParsing)
    .then(jsonParsing)
    .catch(err => console.log('err', err));
};
export const deletePasscode = (params = {}, headers) => {
  return axios
    // .post(`${BASE_URL}${DELETE_MESSAGES}`, params, {headers})
    .delete(`https://api.confidateapp.com/api/deleteVoicePassword/${params.id}`, {headers})
    .then(statusParsing)
    .then(jsonParsing)
    .catch(err => console.log('err', err));
};
// Contacts

export const getContacts = (params = {}, headers) => {
  console.log(params,"AXIOS API CONTACT")
  return axios
    // .post(`${BASE_URL}${GET_CONTACTS}`, params, {headers})
    .post(`https://api.confidateapp.com/api/getContact`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);
};
export const addContacts = (params = {}, headers) => {
  console.log(headers, params , "API AXIOS");
  return axios
    // .post(`${BASE_URL}${ADD_CONTACTS}`, params, {headers})
    .post(`https://api.confidateapp.com/api/ContactCreate`, params)
    .then(statusParsing)
    .then(jsonParsing);

  // .then(statusParsing).then(jsonParsing).catch((err) => console.log('err',err))
};
export const updateContacts = (params = {}, headers) => {
  return axios
    .post(`${BASE_URL}${UPDATE_CONTACTS}`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);

  // .then(statusParsing).then(jsonParsing).catch((err) => console.log('err',err))
};

export const deleteContacts = (params = {}, headers) => {
  return axios
    // .post(`${BASE_URL}${DELETE_CONTACTS}`, params, {headers})
    .delete(`https://api.confidateapp.com/api/deleteContact/${params.id}`, {headers})
    .then(statusParsing)
    .then(jsonParsing)
    .catch(err => console.log('err', err));
};
export const addEntry = (params = {}, headers) => {
  return axios
    // .post(`${BASE_URL}${DATE_ENTRY}`, params, {headers})
    .post(`https://api.confidateapp.com/api/DateCreate`, params)
    .then(statusParsing)
    .then(jsonParsing)
    .catch(err => console.log('err', err));
};
export const dateDetails = (params = {}, headers) => {
  return axios
    // .post(`${BASE_URL}${DATE_DETAILS}`, params, {headers})
    .get(`https://api.confidateapp.com/api/getDateAll`)
    .then(statusParsing)
    .then(jsonParsing);
};
export const locationHistory = (params = {}, headers) => {
  return axios
    .post(`${BASE_URL}${LOCATION_HISTORY}`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing)
    .catch(err => console.log('err', err));
};
export const updateLocationHistory = (params = {}, headers) => {
  return axios
    .post(`${BASE_URL}${UPADATE_HISTORY}`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing)
    .catch(err => console.log('err', err));
};
export const findContacts = (params = {}, headers) => {
  return axios
    .post(`https://api.confidateapp.com/Chat/FindFriends`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing)
    .catch(err => console.log('erraldmlamdlamldmlmalml', err));
};

// https://api.confidateapp.com/Chat/FindFriends
export const getCon = (params, headers) => {
  return axios
    .post(`${BASE_URL}${GET_CONVERSATION}`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);
};
export const createCon = (params = {}, headers) => {
  return axios
    .post(`${BASE_URL}${CREATE_CONVERSATION}`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);
};
export const getChat = (params = {}, headers) => {
  return axios
    .post(`${BASE_URL}${GET_CHAT}`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);
};

export const sendChat = (params = {}, headers) => {
  return axios
    .post(`${BASE_URL}${SEND_CHAT}`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);
};
export const getTestLinks = (params = {}, headers) => {
  return axios
    // .post(`${BASE_URL}${TEST_LINKS}`, params, {headers})
    .get(`https://api.confidateapp.com/api/getTestsAll`)
    .then(statusParsing)
    .then(jsonParsing);
};
export const profileUpload = (params = {}, headers) => {
  return axios
    .post(`${BASE_URL}${PROFILE_UPLOAD}`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);
};
export const deleteConversation = (params = {}, headers) => {
  const Link = `${BASE_URL}${DELETE_CONVERSATION}`;
  return axios
    .post(Link, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);
};
export const editPasswords = (params = {}, headers) => {
  //   const Link = `${BASE_URL}${CHANGE_PASSWORD}`;
  console.log('datatRep', params, headers, `${BASE_URL}${CHANGE_PASSWORD}`);
  return axios
    .post(`${BASE_URL}${CHANGE_PASSWORD}`, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);
};

export const locationHide = (params = {}, headers) => {
  const Link = `${BASE_URL}${TRACK_LOCATION}`;
  console.log(params, headers);
  return axios
    .post(Link, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);
};

export const locationData = (params = {}, headers) => {
  const Link = `${BASE_URL}${LOCATION_DATA}`;
  console.log(params, headers);
  return axios
    .post(Link, params, {headers})
    .then(statusParsing)
    .then(jsonParsing);
};

   

export const listAllQuestions = (params = {}, headers) => {
  return (
    axios
      // .post(`${BASE_URL}${TEST_LINKS}`, params, {headers})
      .get("https://confidateapp.com/wp-json/wpqrap/get_quiz?quiz_id=1")
      .then(statusParsing)
      .then(jsonParsing)
  );
};


export const listAllSecondQuestions = (params = {}, headers) => {
  return (
    axios
      // .post(`${BASE_URL}${TEST_LINKS}`, params, {headers})
      .get("https://confidateapp.com/wp-json/wpqrap/get_quiz?quiz_id=2")
      .then(statusParsing)
      .then(jsonParsing)
  );
};



export const submitQuiz = (params = {}, headers) => {
  const Link = `https://confidateapp.com/wp-json/wpqrap/submit_quiz`;
  console.log(params, headers);
  return axios
    .post(Link, params ,{headers})
    .then(statusParsing)
    .then(jsonParsing);
};