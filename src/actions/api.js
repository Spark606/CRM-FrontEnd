import { createHashHistory } from 'history';
const history = createHashHistory();
import * as cs from '../constants';
import { CALL_API } from '../middlewares/callAPI';
import { message } from 'antd';

// if Refresh set Session to Store
// export function restoreSessionFromLocalStorage() {
//   console.log("哈哈哈哈哈，我来啦，我来啦~");
//   const tokenString = localStorage.getItem('sessions');
//   if (!tokenString) {
//     history.push('/login');
//   }
//   return { type: 'DO_LOGIN' };
// }
export function getUserInfo() {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/getPersonalInfoApi',
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        types: [cs.GET_USER_MSG_REQUEST, cs.GET_USER_MSG_SUCCESS, cs.GET_USER_MSG_FAIL],
      },
    });
    if (action.type === cs.GET_USER_MSG_SUCCESS) {
      const { user_Id, user_name, user_role } = action.payload.data;
      localStorage.setItem('user', JSON.stringify({
        user_Id: user_Id,
        user_name: user_name,
        user_role: user_role
      }));
    }
    return action;
  };
}
// Login

export function login(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/login',
        // endpoint: '/api/v1/login',
        method: 'POST',
        body: params,
        mode: "cors",
        header: {
          'Content-Type': 'application/json',
        },
        types: [cs.LOGIN_REQUEST, cs.LOGIN_SUCCESS, cs.LOGIN_FAIL],
      },
    });

    if (action.type === cs.LOGIN_SUCCESS) {
      const { token, user_Id, user_name, user_role } = action.payload.data;
      if (token) {
        localStorage.setItem('sessions', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify({
          user_Id: user_Id,
          user_name: user_name,
          user_role: user_role
        }));
        history.push('/main/workspace');
      }
    }

    if (action.type === cs.LOGIN_FAIL) { console.log(action); message.error(action.error.data.msg) }
    return action;
  };
}
export function logout() {
  localStorage.removeItem('sessions');
  localStorage.removeItem('user');
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
    if (action.type === cs.REG_SUCCESS) {
      const { token } = action.payload;
      if (token) {
        localStorage.setItem('sessions', JSON.stringify(action.payload));
      }
    }
    return action;
  };
}
export function verifyToken() {
  // 存在token则验证其有效性
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/verifyToken',
        method: 'GET',
        types: [
          cs.UPDATE_TOKEN_REQUEST,
          cs.UPDATE_TOKEN_SUCCESS,
          cs.UPDATE_TOKEN_FAIL
        ]
      }
    });
    if (action.type === cs.UPDATE_TOKEN_SUCCESS) {
      const { token, user_Id, user_name, user_role } = action.payload.data;
      localStorage.setItem('sessions', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify({
        user_Id: user_Id,
        user_name: user_name,
        user_role: user_role
      }));
    }
    if (action.type === cs.UPDATE_TOKEN_FAIL) {
      // token失效
      localStorage.removeItem('sessions');
      localStorage.removeItem('user');
      history.push('/login');
    }
  };
}

export function updateUserInf(params, callBack) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/updatePersonalInfo',
        method: 'POST',
        body: params,
        mode: "cors",
        header: {
          'Content-Type': 'application/json',
        },
        types: [cs.UPDATE_USER_INFORMATION_REQUEST, cs.UPDATE_USER_INFORMATION_SUCCESS, cs.UPDATE_USER_INFORMATION_FAIL],
      },
    });
    if (action.type === cs.UPDATE_USER_INFORMATION_SUCCESS) {
      callBack();
      localStorage.setItem('user', JSON.stringify({
        user_Id: action.payload.data.user_email,
        user_name: action.payload.data.user_name,
        user_role: action.payload.data.user_phonenumber
      }));
    }
    return action;
  }
}

export function getEmployeeList() {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/manager/getEmployeeList',
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        types: [cs.GET_EMPLOYEE_LIST_REQUEST, cs.GET_EMPLOYEE_LIST_SUCCESS, cs.GET_EMPLOYEE_LIST_FAIL],
      },
    });
    return action;
  };
}


export function getCode(params, callBack) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/getCode',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_CODE_REQUEST, cs.GET_CODE_SUCCESS, cs.GET_CODE_FAIL],
      },
    });
    if (action.type === cs.GET_CODE_SUCCESS) {
      message.success('验证码发送成功！');
      callBack();
    }
    if (action.type === cs.GET_CODE_FAIL) {
      if (action.error.data) message.error(action.error.data.msg);
      else message.error("验证码发送失败！")
    }
    return action;
  };
}

export function verifyCode(params, callBack) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/verifyCode',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.VERIFY_CODE_REQUEST, cs.VERIFY_CODE_SUCCESS, cs.VERIFY_CODE_FAIL],
      },
    });
    if (action.type === cs.VERIFY_CODE_SUCCESS) {
      callBack();
    }
    if (action.type === cs.VERIFY_CODE_FAIL) {
      if (action.error.data) message.error(action.error.data.msg);
    }
    return action;
  };
}

export function resetPassword(params, callBack) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/resetPassword',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.RESET_PASSWD_REQUEST, cs.RESET_PASSWD_SUCCESS, cs.RESET_PASSWD_FAIL],
      },
    });
    if (action.type === cs.RESET_PASSWD_SUCCESS) {
      callBack();
    }
    if (action.type === cs.RESET_PASSWD_FAIL) {
      if (action.error.data) message.error(action.error.data.msg);
    }
    return action;
  };
}


// export function getUserFromSession() {
//   const userString = localStorage.getItem('user');
//   if (userString) {
//     const user = JSON.parse(userString);
//     if (user) {
//       return {
//         type: cs.GET_USER_MSG_FROM_SESSION,
//         payload: user,
//       }
//     }
//   }
//   return { type: 'DO_LOGIN' };
// }