// import jwtDecode from 'jwt-decode';
import { createHashHistory } from 'history';
import * as cs from '../constants';
import {CALL_API} from '../middlewares/callAPI';
const history = createHashHistory();
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
/**
 * 登录检查.
 */
export function checkLogin() {
  try {
    const sessions = JSON.parse(localStorage.getItem('sessions'));
    if(!sessions) {
      history.push('/');
    }
  } catch (e) {
    history.push('/');
  }
}

// Login
export function login(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/',
        method: 'POST',
        body: params,
        types: [cs.LOGIN_REQUEST, cs.LOGIN_SUCCESS, cs.LOGIN_FAIL],
      },
    });

    if(action.type === cs.LOGIN_SUCCESS && action.payload) {
      const {token} = action.payload;
      if(token) {
        localStorage.setItem('sessions', JSON.stringify(action.payload));
        const ref = sessionStorage.getItem('ref');
        if(ref) {
          history.push('/main/client/table');
        } else {
          history.push('/login');
        }
      }
    }
    return action;
  };
}

export function logout() {
  localStorage.removeItem('sessions');
  history.push('/');
}
