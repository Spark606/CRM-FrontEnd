import * as cs from '../constants';
import {CALL_API} from '../middlewares/callAPI';

const url = 'http://192.168.205.221:8000';

// get delete client page
export function getDeleteClientsList(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/manager/getResourceCheckList',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_DELETE_CLIENTS_LIST_REQUEST, cs.GET_DELETE_CLIENTS_LIST_SUCCESS, cs.GET_DELETE_CLIENTS_LIST_FAIL],
      },
    });
    return action;
  };
}

// get update client page
export function getUpdateClientsList(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/manager/getResourceCheckList',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_UPDATE_CLIENTS_LIST_REQUEST, cs.GET_UPDATE_CLIENTS_LIST_SUCCESS, cs.GET_UPDATE_CLIENTS_LIST_FAIL],
      },
    });
    return action;
  };
}

// get delete client page
export function getDeleteFirmsList(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/test',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_DELETE_FIRMS_LIST_REQUEST, cs.GET_DELETE_FIRMS_LIST_SUCCESS, cs.GET_DELETE_FIRMS_LIST_FAIL],
      },
    });
    return action;
  };
}

// get update client page
export function getUpdateFirmsList(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/test',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_UPDATE_FIRMS_LIST_REQUEST, cs.GET_UPDATE_FIRMS_LIST_SUCCESS, cs.GET_UPDATE_FIRMS_LIST_FAIL],
      },
    });
    return action;
  };
}

export function checkPassClient(params, currentPage, pageSize){
    return async (dispatch) => {
      const action = await dispatch({
        [CALL_API]: {
          endpoint: '/crm/manager/checkResourceCheckList',
          method: 'POST',
          mode: "cors",
          body: params,
          header: {
            'Content-Type': 'application/json',
          },
          timeout: 3000,
          types: [cs.CKECK_PASS_CLIENT_REQUEST, cs.CKECK_PASS_CLIENT_SUCCESS, cs.CKECK_PASS_CLIENT_FAIL],
        },
      });
      if(action.payload.data === 'UPDATE_RESOURCE_SUCCESS'){
        this.getUpdateClientsList({
          checkedStatus: 0,
          page: currentPage,
          pageSize: pageSize
        })
      }
      return action;
    };
  }
  export function checkPassFirm(params){
    return async (dispatch) => {
      const action = await dispatch({
        [CALL_API]: {
          endpoint: '/crm/manager/checkResourceCheckList',
          method: 'POST',
          mode: "cors",
          body: params,
          header: {
            'Content-Type': 'application/json',
          },
          timeout: 3000,
          types: [cs.CKECK_PASS_FIRM_REQUEST, cs.CKECK_PASS_FIRM_SUCCESS, cs.CKECK_PASS_FIRM_FAIL],
        },
      });
      return action;
    };
  }