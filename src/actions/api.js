import { createHashHistory } from 'history';
const history = createHashHistory();
import * as cs from '../constants';
import {CALL_API} from '../middlewares/callAPI';

// if Refresh set Session to Store
// const url = 'http://127.0.0.1:7001';
const url = 'http://192.168.205.221:8000';
export function restoreSessionFromLocalStorage() {
  const sessionString = localStorage.getItem('sessions');
  if(sessionString) {
    const session = JSON.parse(sessionString);

    if(session.token) {
      return {
        type: cs.LOGIN_SUCCESS,
        payload: JSON.parse(sessionString),
      };
    }
  }
  return {type: 'DO_LOGIN'};
}
// Login

export function login(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: url + '/crm/login',
        // endpoint: url + '/api/v1/login',
        method: 'POST',
        body: params,
        mode: "cors",
        header: {
          'Content-Type': 'application/json',
        },
        types: [cs.LOGIN_REQUEST, cs.LOGIN_SUCCESS, cs.LOGIN_FAIL],
      },
    });

    if(action.type === cs.LOGIN_SUCCESS && action.payload) {
      const {token} = action.payload.data;
      if(token) {
        localStorage.setItem('sessions', JSON.stringify(token));
        history.push('/main/client/table');
      }
    }
    return action;
  };
}
export function logout() {
  localStorage.removeItem('sessions');
  history.push('/login');
}
export function register(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/account/regist/local',
        method: 'POST',
        body: params,
        types: [cs.REG_REQUEST, cs.REG_SUCCESS, cs.REG_FAIL],
      },
    });
    if(action.type === cs.REG_SUCCESS && action.payload) {
      const {token} = action.payload;
      if(token) {
        localStorage.setItem('sessions', JSON.stringify(action.payload));
      }
    }
    return action;
  };
}

export function checkLogin() {
  try {
    const sessions = JSON.parse(localStorage.getItem('sessions'));
    if(!sessions) {
      history.push('/login');
    }
  } catch (e) {
    history.push('/login');
  }
}
export function refreshToken(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/api/v1/user/refresh_token',
        body: params,
        method: 'PATCH',
        loading: false,
        types: [
          cs.UPDATE_TOKEN_REQUEST,
          cs.UPDATE_TOKEN_SUCCESS,
          cs.UPDATE_TOKEN_FAIL
        ]
      }
    });
    if(action.type === cs.UPDATE_TOKEN_SUCCESS) {
      // console.log(action);
      const {token} = action.payload;
      if(token) {
        localStorage.setItem('sessions', JSON.stringify(action.payload));
      }
    }
    if(action.type === cs.UPDATE_TOKEN_FAIL) {
      // console.log(action);
      // 没有找到用户
      if(action.error.code === '205005') {
        localStorage.removeItem('sessions');
        history.push('/login');
      }
    }
  };
}