import {combineReducers} from 'redux';
import userInfo from './user/getUser.reducer';
import userLogin from './login/loginReducer';
import getCont from './getContacts/getContact.reducer';
import getConser from './getConverstaion/getCon.reducer';
import getChat from './chat/getChat.reducer';
import getLinks from './testLinks/getLinks.reducer';
import emergencyContacts from './emergencyContact/emerggencyContact.reducer';
import initiateChat from './getInitatechat/initialChat.reducer';
import emergencyMessage from './emergencyMessage/emergencymessage.reducer';
import dateEntry from './dateEntry/dateEntry.reducer';

export default combineReducers({
  userInfo,
  userLogin,
  getCont,
  getConser,
  getChat,
  getLinks,
  initiateChat,
  emergencyContacts,
  emergencyMessage,
  dateEntry,
});
