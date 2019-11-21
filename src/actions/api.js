// import jwtDecode from 'jwt-decode';
import { createHashHistory } from 'history';
import * as cs from '../constants';
import axios from 'axios';
import qs from 'qs';
const history = createHashHistory();

const Axios = axios.create({
  baseURL: 'http://127.0.0.1:7001/',
  timeout: 10000,
  headers: {
      "Access-Control-Allow-Origin": "*", // 包含自定义header字段的跨域请求，浏览器会先向服务器发送OPTIONS请求
  }
})

export function getLogin (params){
  // console.log(params);
  Axios.post('api/v1/index', qs.stringify(params))
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
export function logout() {
  localStorage.removeItem('sessions');
  history.push('/');
}
