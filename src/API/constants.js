/**
 * Add api related constant like endpoints, urls etc here
 */

export const BASE_URL = 'https://api.confidateapp.com/api/';

/** ***************************** HTTP VERBS ************************* */
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

/** ***************************** STATUS CODES ********************** */
export const HTTP_CODES = {
  OK: 200,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

/** **************************** ENDPOINTS ************************* */
export const ADD_USER = '/api/User/Add';
export const LOGIN = '/login';
export const GET_USER = '/api/getUser/';
export const UPDATE_USER = '/api/User/Update';
export const REQUEST_OTP = '/api/Auth/RequestOtp';
export const VERIFY_OTP = '/api/Auth/ValidateOtp';
export const UPDATE_PASSWORD = '/api/Auth/ChangePassword';
export const GET_MESSAGES = '/api/Emergency/messages/Get';
export const ADD_MESSAGES = '/api/Emergency/messages/Add';
export const ACTIVE_MESSAGES = '/api/Emergency/messages/Activate';
export const DELETE_MESSAGES = '/api/Emergency/messages/Delete';
export const LOCATION_DATA = '/api/Emergency/sos';
export const GET_CONTACTS = '/api/Emergency/contacts/Get';
export const ADD_CONTACTS = '/api/Emergency/contacts/Add';
export const DELETE_CONTACTS = '/api/Emergency/contacts/Delete';
export const UPDATE_CONTACTS = '/api/Emergency/contacts/Update';
export const DATE_ENTRY = '/api/User/AddDateEntry';
export const DATE_DETAILS = '/api/User/GetUserDateHistory';
export const LOCATION_HISTORY = '/api/User/GetLocationHistory';
export const UPADATE_HISTORY = '/api/User/UpdateLocation';
export const FIND_CONTACT = '/api/Chat/FindFriends';
export const GET_CONVERSATION = '/api/Chat/GetMyConversations';
export const CREATE_CONVERSATION = '/api/Chat/CreateConversation';
export const GET_CHAT = '/api/Chat/GetChat';
export const SEND_CHAT = '/api/Chat/SaveChat';
export const TEST_LINKS = '/api/User/GetPsyTests';
export const PROFILE_UPLOAD = '/api/User/UpdateProfilePic';
export const DELETE_CONVERSATION = '/api/Chat/DeleteConversation';
export const CHANGE_PASSWORD = '/api/Auth/ResetPassword';
export const TRACK_LOCATION = '/api/User/UpdateTrackingConsent';
