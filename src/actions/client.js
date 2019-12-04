import * as cs from '../constants';
import {CALL_API} from '../middlewares/callAPI';

// client page
export function getClients(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/getResourceList',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_CLIENTS_REQUEST, cs.GET_CLIENTS_SUCCESS, cs.GET_CLIENTS_FAIL],
      },
    });
    return action;
  };
}
export function getClientRecordsList(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/getResourceFollows',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_CLIENT_RECORDS_REQUEST, cs.GET_CLIENT_RECORDS_SUCCESS, cs.GET_CLIENT_RECORDS_FAIL],
      },
    });
    return action;
  };
}
export function addNewClientRecord(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/createResourceFollow',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs. ADD_NEW_CLIENT_RECORD_REQUEST, cs. ADD_NEW_CLIENT_RECORD_SUCCESS, cs. ADD_NEW_CLIENT_RECORD_FAIL],
      },
    });
    return action;
  };
}
export function addNewClient(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/createResource',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.ADD_NEW_CLIENT_REQUEST, cs.ADD_NEW_CLIENT_SUCCESS, cs.ADD_NEW_CLIENT_FAIL],
      },
    });
    if(action.type === cs.ADD_NEW_CLIENT_SUCCESS && action.payload) {
      this.getClients({
        page: 1,
        pageSize: 2,
      })
    }
    return action;
  };
}
export function updateOneClient(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/updateResource',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.UPDATE_ONE_CLIENT_REQUEST, cs.UPDATE_ONE_CLIENT_SUCCESS, cs.UPDATE_ONE_CLIENT_FAIL],
      },
    });
    return action;
  };
}
export function deleteClient(params, currentPage, pageSize){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/deleteResource',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.DELETE_ONE_CLIENT_REQUEST, cs.DELETE_ONE_CLIENT_SUCCESS, cs.DELETE_ONE_CLIENT_FAIL],
      },
    });
    if(action.type === cs.DELETE_ONE_CLIENT_SUCCESS && action.payload) {
      this.getClients({
        page: currentPage,
        pageSize: pageSize,
      })
    }
    return action;
  };
}
export function getAllClients(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/getResourceNames',
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_ALL_CLIENTS_REQUEST, cs.GET_ALL_CLIENTS_SUCCESS, cs.GET_ALL_CLIENTS_FAIL],
      },
    });
    return action;
  };
}


export function addNewClientOrder(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/createResource',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.ADD_NEW_CLIENT_ORDER_REQUEST, cs.ADD_NEW_CLIENT_ORDER_SUCCESS, cs.ADD_NEW_CLIENT_ORDER_FAIL],
      },
    });
    return action;
  };
}