// import jwtDecode from 'jwt-decode';
import { createHashHistory } from 'history';
import $ from 'jquery';
const history = createHashHistory();

export function getLogin(params) {
  $.ajax({
    url: 'http://192.168.205.221:8000/' + 'crm/login',
    data: params,
    type: 'POST',
    crossDomain: true,
    success: (res) => {
      console.log(res);
      if(res.code === 0) {
        const ticket = res.data.ticket;
        localStorage.setItem('sessions', ticket);
        history.push('/main/client/table');
      }
    },
    error: (err) => {
      console.log(err)
    }
  });
}

/**
 * 退出.
 */
export function logout() {
  localStorage.removeItem('sessions');
  history.push('/');
}
