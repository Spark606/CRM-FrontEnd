import jwtDecode from 'jwt-decode';

import {findErrorMessage} from '../actions/base';
import * as cs from '../constants';

const sessionsLocal = localStorage.getItem('sessions');
let decodeSessions = {};
let userMsg = {};
if(sessionsLocal) {
  userMsg = JSON.parse(sessionsLocal).userMsg;
  decodeSessions = jwtDecode(sessionsLocal);
}
const initialState = {
  isFetching: false,
  user_name: null,
  user_panel: 'BUYER',
  token: null,
  errorMessage: 'Server Lost Connect!'
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case cs.LOGIN_REQUEST:
      return Object.assign({}, state, {error: false, isFetching: true});
    case cs.LOGIN_SUCCESS:
      // console.log(decodeSessions);
      return Object.assign({}, state, {
        isFetching: false,
        ...action.payload.userMsg,
        ...decodeSessions,
        token: action.payload.token,
        status: action.payload.userMsg.status
      });
    case cs.LOGIN_FAIL:
      return Object.assign({}, state, {
        error: true,
        isFetching: false,
        errorMessage: findErrorMessage(action.error.code)
      });
    default:
      return state;
  }
}