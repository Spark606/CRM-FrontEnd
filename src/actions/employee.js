import * as cs from '../constants';
import { CALL_API } from '../middlewares/callAPI';
import { message } from 'antd';

export function getEmployeeTree() {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/manager/getEmployeeTree',
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        types: [cs.GET_EMPLOYEE_TREE_REQUEST, cs.GET_EMPLOYEE_TREE_SUCCESS, cs.GET_EMPLOYEE_TREE_FAIL],
      },
    });
    return action;
  };
}


export function getEmployeeDetail(params, callBack) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/manager/getEmployeeDetail',
        method: 'POST',
        body: params,
        mode: "cors",
        header: {
          'Content-Type': 'application/json',
        },
        types: [cs.GET_EMPLOYEE_DETAIL_REQUEST, cs.GET_EMPLOYEE_DETAIL_SUCCESS, cs.GET_EMPLOYEE_DETAIL_FAIL],
      },
    });

    if (action.type === cs.GET_EMPLOYEE_DETAIL_SUCCESS) {
      callBack();
    }
    return action;
  };
}

export function getManagerEmployeeList() {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/manager/getManagerEmployeeList',
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        types: [cs.GET_MANAGER_EMPLOYEE_REQUEST, cs.GET_MANAGER_EMPLOYEE_SUCCESS, cs.GET_MANAGER_EMPLOYEE_FAIL],
      },
    });
    return action;
  };
}

export function addNewEmployee(params, callBack) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/manager/createEmployee',
        method: 'POST',
        body: params,
        mode: "cors",
        header: {
          'Content-Type': 'application/json',
        },
        types: [cs.ADD_NEW_EMPLOYEE_REQUEST, cs.ADD_NEW_EMPLOYEE_SUCCESS, cs.ADD_NEW_EMPLOYEE_FAIL],
      },
    });
    if (action.type === cs.ADD_NEW_EMPLOYEE_SUCCESS) {
      callBack();
    }
    return action;
  };
}

export function updateEmployee(params, callBack) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/manager/updateEmployee',
        method: 'POST',
        body: params,
        mode: "cors",
        header: {
          'Content-Type': 'application/json',
        },
        types: [cs.UPDATE_EMPLOYEE_REQUEST, cs.UPDATE_EMPLOYEE_SUCCESS, cs.UPDATE_EMPLOYEE_FAIL],
      },
    });
    if (action.type === cs.UPDATE_EMPLOYEE_SUCCESS) {
      callBack();
    }
    return action;
  };
}

export function deleteEmployee(params, callBack) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/manager/deleteEmployee',
        method: 'POST',
        body: params,
        mode: "cors",
        header: {
          'Content-Type': 'application/json',
        },
        types: [cs.DELETE_EMPLOYEE_REQUEST, cs.DELETE_EMPLOYEE_SUCCESS, cs.DELETE_EMPLOYEE_FAIL],
      },
    });
    if (action.type === cs.DELETE_EMPLOYEE_SUCCESS) {
      callBack();
    }
    return action;
  };
}


export function restPassWord(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/resetPasswordAdmin',
        method: 'POST',
        body: params,
        mode: "cors",
        header: {
          'Content-Type': 'application/json',
        },
        types: [cs.RESET_PASSWORD_REQUEST, cs.RESET_PASSWORD_SUCCESS, cs.RESET_PASSWORD_FAIL],
      },
    });
    if (action.type === cs.RESET_PASSWORD_SUCCESS) {
      message.success("重置密码成功！")
    }
    return action;
  };
}