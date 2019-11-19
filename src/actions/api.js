// import jwtDecode from 'jwt-decode';
import { createHashHistory } from 'history';
import * as cs from '../constants';
import {CALL_API} from '../middlewares/callAPI';
import axios from 'axios';
const history = createHashHistory();

const Axios = axios.create({
  baseURL: 'http://127.0.0.1:7001/',
  timeout: 10000,
  responseType: 'json',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      "Access-Control-Allow-Origin": "*",
  }
})

export function getLogin (params){
  var api = "api/v1/login";  //拼接api地址

  Axios.get(api)
      .then(res => {
          console.log(res);
          this.setState({
              user: res.data  //获取的数据保存到list数组
          })
      })
      .catch(err => {
          console.error(err);
      })
}



























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
export function _login(params) {
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
