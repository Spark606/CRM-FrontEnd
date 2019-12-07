import * as cs from '../constants';
import { CALL_API } from '../middlewares/callAPI';

export function getEmployeeTree() {
    return async (dispatch) => {
      const action = await dispatch({
        [CALL_API]: {
          endpoint: '/crm/manager/test',
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
  

  export function getEmployeeDetail(params) {
    return async (dispatch) => {
      const action = await dispatch({
        [CALL_API]: {
          endpoint: '/crm/manager/test',
          method: 'POST',
          body: params,
          mode: "cors",
          header: {
            'Content-Type': 'application/json',
          },
          types: [cs.GET_EMPLOYEE_DETAIL_REQUEST, cs.GET_EMPLOYEE_DETAIL_SUCCESS, cs.GET_EMPLOYEE_DETAIL_FAIL],
        },
      });
      return action;
    };
  }
  
  export function getManagerEmployeeList() {
    return async (dispatch) => {
      const action = await dispatch({
        [CALL_API]: {
          endpoint: '/crm/manager/test',
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
          endpoint: '/crm/manager/test',
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
  