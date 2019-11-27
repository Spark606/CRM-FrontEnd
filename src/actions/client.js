import * as cs from '../constants';
import {CALL_API} from '../middlewares/callAPI';

const url = 'http://192.168.205.221:8000';

// client page
export function getClients(){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: url + '/crm/employee/getResourceList',
        method: 'GET',
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
        endpoint: url + '/crm/employee/getResourceFollows',
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

export function addNewClient(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: url + 'crm/employee/createResource',
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
    return action;
  };
}

export function updateOneClient(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: url + '/crm/employee/update',
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

export function deleteClient(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: url + '/crm/employee/delete',
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
    return action;
  };
}