import jwtDecode from 'jwt-decode';

import { findErrorMessage } from '../actions/base';
import * as cs from '../constants';

// const sessionsLocal = localStorage.getItem('sessions');
// let decodeSessions = {};
// let userMsg = {};
// if(sessionsLocal) {
//   userMsg = JSON.parse(sessionsLocal).userMsg;
//   decodeSessions = jwtDecode(sessionsLocal);
//   // console.log('------------>', decodeSessions);
// }
const initialState = {
  isFetching: false,
  version: 'v1.2',
  user_name: null,
  user_panel: 'BUYER',
  company_name: '',
  viewer: false,
  token: null,
  error: false,
  actionInfo: {},
  company_logo_url: null,
  companies: [],
  isCompanyCreator: false,
  loginMsg: {},
  regMsg: {},
  status: 'IN_ACTIVE',
  verifyStatus: null,
  verifyMsg: {},
  id: null,
  is_new: null,
  is_use_psd: false,
  regStatus: false,
  refer: '',
  feedbackStatus: false,
  errorMessage: 'Server Lost Connect!'
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case cs.LOGIN_REQUEST:
      return Object.assign({}, state, { error: false, isFetching: true });
    case cs.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.payload.userMsg,
        ...decodeSessions,
        companies: action.payload.userMsg.companies,
        isCompanyCreator: action.payload.userMsg.companies && action.payload.userMsg.companies.length > 0 && action.payload.userMsg.companies[0].FK_admin_id === state.id,
        ...userMsg,
        company_logo_url: (action.payload.userMsg.companies && action.payload.userMsg.companies.length > 0 && action.payload.userMsg.companies[0].company_logo_url) || action.payload.userMsg.company_logo_url,
        company_name: (action.payload.userMsg.companies && action.payload.userMsg.companies.length > 0 && action.payload.userMsg.companies[0].company_name) || action.payload.userMsg.company_name || '',
        token: action.payload.token,
        status: action.payload.userMsg.status
      });
    case cs.LOGIN_FAIL:
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
        companies: action.payload.userMsg.companies,
        isCompanyCreator: action.payload.userMsg.companies && action.payload.userMsg.companies.length > 0 && action.payload.userMsg.companies[0].FK_admin_id === state.id,
        company_logo_url: (action.payload.userMsg.companies && action.payload.userMsg.companies.length > 0 && action.payload.userMsg.companies[0].company_logo_url) || action.payload.userMsg.company_logo_url,
        company_name: (action.payload.userMsg.companies && action.payload.userMsg.companies.length > 0 && action.payload.userMsg.companies[0].company_name) || action.payload.userMsg.company_name || '',
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
