import * as cs from '../constants';
import {CALL_API} from '../middlewares/callAPI';
import { message } from 'antd';

const url = 'http://192.168.205.221:8000';

// client page
export function getFirms(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/getCompanyList',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_FIRMS_REQUEST, cs.GET_FIRMS_SUCCESS, cs.GET_FIRMS_FAIL],
      },
    });
    return action;
  };
}

export function getFirmRecordsList(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/getCompanyFollows',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_FIRM_RECORDS_REQUEST, cs.GET_FIRM_RECORDS_SUCCESS, cs.GET_FIRM_RECORDS_FAIL],
      },
    });
    return action;
  };
}

export function addNewFirmRecord(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/createCompanyFollow',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs. ADD_NEW_FIRM_RECORD_REQUEST, cs. ADD_NEW_FIRM_RECORD_SUCCESS, cs. ADD_NEW_FIRM_RECORD_FAIL],
      },
    });
    return action;
  };
}

export function addNewFirm(params, shareStatus, pageSize, callBack){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/createCompany',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.ADD_NEW_FIRM_REQUEST, cs.ADD_NEW_FIRM_SUCCESS, cs.ADD_NEW_FIRM_FAIL],
      },
    });
    if(action.type === cs.ADD_NEW_FIRM_SUCCESS) {
      callBack(shareStatus, pageSize);
    }
    if(action.type === cs.ADD_NEW_FIRM_FAIL && action.error.msg) {
      message.error(action.error.msg)
    }
    return action;
  };
}

export function updateOneFirm(params, shareStatus, pageSize, callBack){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/updateCompany',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.UPDATE_ONE_FIRM_REQUEST, cs.UPDATE_ONE_FIRM_SUCCESS, cs.UPDATE_ONE_FIRM_FAIL],
      },
    });
    if(action.type === cs.UPDATE_ONE_FIRM_SUCCESS) {
      callBack(shareStatus, pageSize);
    }
    return action;
  };
}

export function deleteFirm(params, currentPage, pageSize, shareStatus){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/deleteCompany',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.DELETE_ONE_FIRM_REQUEST, cs.DELETE_ONE_FIRM_SUCCESS, cs.DELETE_ONE_FIRM_FAIL],
      },
    });
    if(action.type === cs.DELETE_ONE_FIRM_SUCCESS) {
      this.getFirms({
        shareStatus: shareStatus,
        page: currentPage,
        pageSize: pageSize,
      })
    }
    return action;
  };
}
export function getAllFirms(){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/getCompanyNames',
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_ALL_FIRMS_REQUEST, cs.GET_ALL_FIRMS_SUCCESS, cs.GET_ALL_FIRMS_FAIL],
      },
    });
    return action;
  };
}


export function addNewFirmOrder(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/business/createCompanyBusiness',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.ADD_NEW_FIRM_ORDER_REQUEST, cs.ADD_NEW_FIRM_ORDER_SUCCESS, cs.ADD_NEW_FIRM_ORDER_FAIL],
      },
    });
    return action;
  };
}

export function updateFirmShareStatus(params, shareStatus, pageSize, callBack){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/updateCompanyShareStatus',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.UPDATE_ONE_FIRM_SHARESTATUS_REQUEST, cs.UPDATE_ONE_FIRM_SHARESTATUS_SUCCESS, cs.UPDATE_ONE_FIRM_SHARESTATUS_FAIL],
      },
    });
    
    if(action.type === cs.UPDATE_ONE_FIRM_SHARESTATUS_SUCCESS) {
      callBack({
        shareStatus: shareStatus,
        page: 1,
        pageSize: pageSize,
      });
    }
    return action;
  };
}
