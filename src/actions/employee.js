import * as cs from '../constants';
import { CALL_API } from '../middlewares/callAPI';

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
  

  export function getEmployeeDetail(params,callBack) {
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
      
      if(action.type === cs.GET_EMPLOYEE_DETAIL_SUCCESS && action.payload) {
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
      if(action.type === cs.ADD_NEW_EMPLOYEE_SUCCESS && action.payload) {
        callBack();
      }
      return action;
    };
  }

  export function updateEmployee(params, callBack) {
    return async (dispatch) => {
      const action = await dispatch({
        [CALL_API]: {
          endpoint: '/crm/manager/updateEmployeeManager',
          method: 'POST',
          body: params,
          mode: "cors",
          header: {
            'Content-Type': 'application/json',
          },
          types: [cs.UPDATE_EMPLOYEE_REQUEST, cs.UPDATE_EMPLOYEE_SUCCESS, cs.UPDATE_EMPLOYEE_FAIL],
        },
      });
      if(action.type === cs.UPDATE_EMPLOYEE_SUCCESS && action.payload) {
        callBack();
      }
      return action;
    };
  }
  