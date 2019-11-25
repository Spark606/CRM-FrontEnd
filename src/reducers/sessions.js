import jwtDecode from 'jwt-decode';

import { findErrorMessage } from '../actions/base';
import * as cs from '../constants';

// const sessionsLocal = localStorage.getItem('sessions');
let decodeSessions = {};
let userMsg = {};
// if(sessionsLocal) {
//   userMsg = JSON.parse(sessionsLocal).userMsg;
//   decodeSessions = jwtDecode(sessionsLocal);
//   // console.log('------------>', decodeSessions);
// }
const initialState = {
  isFetching: false,
  user_name: null,
  user_role: 'BUYER',
  token: null,
  error: false,
  loginMsg: {},
  regMsg: {},
  id: null,
  errorMessage: 'Server Lost Connect!'
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case cs.LOGIN_REQUEST:
        console.log("正在登录");
      return Object.assign({}, state, { error: false, isFetching: true });
    case cs.LOGIN_SUCCESS:
        console.log("登录成功", action.payload);
      return Object.assign({}, state, {
        isFetching: false,
        ...action.payload.userMsg,
        ...decodeSessions,...userMsg,
        token: action.payload.token,
      });
    case cs.LOGIN_FAIL:
      console.log("登录失败", action);
      return Object.assign({}, state, {
        error: true,
        isFetching: false,
        errorMessage: findErrorMessage(action.error.code)
      });

    case cs.UPDATE_TOKEN_REQUEST:
      return Object.assign({}, state, { error: false, isFetching: true });
    case cs.UPDATE_TOKEN_SUCCESS:
      // console.log(decodeSessions);
      return Object.assign({}, state, {
        isFetching: false,
        token: action.payload.token
      });
    case cs.UPDATE_TOKEN_FAIL:
      return Object.assign({}, state, {
        error: true,
        isFetching: false,
        errorMessage: findErrorMessage(action.error.code)
      });

    case cs.REG_REQUEST:
      return Object.assign({}, state, { error: false, isFetching: true });
    case cs.REG_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.payload.userMsg,
        token: action.payload.token,
        regStatus: true,
      });
    case cs.REG_FAIL:
      return Object.assign({}, state, {
        error: true,
        isFetching: false,
        errorMessage: findErrorMessage(action.error.code)
      });

    case cs.LOGOUT:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
