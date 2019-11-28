import * as cs from '../constants';
import {CALL_API} from '../middlewares/callAPI';

const url = 'http://192.168.205.221:8000';

// client page
export function getFirms(){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: url + '/crm/employee/getCompanyList',
        method: 'GET',
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
        endpoint: url + '/crm/firm/test',
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

export function addNewFirm(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: url + '/crm/employee/createCompany',
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
    return action;
  };
}

export function updateOneFirm(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: url + '/crm/firm/update',
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
    return action;
  };
}

export function deleteFirm(params){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: url + '/crm/firm/delete',
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
    return action;
  };
}