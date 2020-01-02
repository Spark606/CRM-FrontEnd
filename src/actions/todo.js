import * as cs from '../constants';
import { CALL_API } from '../middlewares/callAPI';
import { message } from 'antd';
// get delete client page
export function getDeleteClientsList(params) {
  params.requestStatus = 1;
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
export function getUpdateClientsList(params) {
  params.requestStatus = 0;
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
export function getDeleteFirmsList(params) {
  params.requestStatus = 1;
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/manager/getCompanyCheckList',
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
export function getUpdateFirmsList(params) {
  params.requestStatus = 0;
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/manager/getCompanyCheckList',
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

export function checkPassClient(params, checkedStatus, currentPage, pageSize) {
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
    if (action.payload.data === 'UPDATE_RESOURCE_SUCCESS') {
      this.getUpdateClientsList({
        checkedStatus: checkedStatus,
        page: currentPage,
        pageSize: pageSize
      })
    }
    if (action.payload.data === 'REJECT_UPDATE_SUCCESS') {
      this.getUpdateClientsList({
        checkedStatus: checkedStatus,
        page: currentPage,
        pageSize: pageSize
      })
    }
    if (action.payload.data === 'DELETE_RESOURCE_SUCCESS') {
      this.getDeleteClientsList({
        checkedStatus: checkedStatus,
        page: currentPage,
        pageSize: pageSize
      })
    }
    if (action.payload.data === 'REJECT_DELETE_SUCCESS') {
      this.getDeleteClientsList({
        checkedStatus: checkedStatus,
        page: currentPage,
        pageSize: pageSize
      })
    }
    return action;
  };
}
export function checkPassFirm(params, checkedStatus, currentPage, pageSize) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/manager/checkCompanyCheckList',
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
    if (action.payload.data === 'UPDATE_COMPANY_SUCCESS') {
      this.getUpdateFirmsList({
        checkedStatus: checkedStatus,
        page: currentPage,
        pageSize: pageSize
      })
    }
    if (action.payload.data === 'REJECT_UPDATE_SUCCESS') {
      this.getUpdateFirmsList({
        checkedStatus: checkedStatus,
        page: currentPage,
        pageSize: pageSize
      })
    }
    if (action.payload.data === 'DELETE_COMPANY_SUCCESS') {
      this.getDeleteFirmsList({
        checkedStatus: checkedStatus,
        page: currentPage,
        pageSize: pageSize
      })
    }
    if (action.payload.data === 'REJECT_DELETE_SUCCESS') {
      this.getDeleteFirmsList({
        checkedStatus: checkedStatus,
        page: currentPage,
        pageSize: pageSize
      })
    }
    return action;
  };
}


export function getPayBackList(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/payback/getAllPayBackRecordTempListByStatus',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_PAYBACK_LIST_REQUEST, cs.GET_PAYBACK_LIST_SUCCESS, cs.GET_PAYBACK_LIST_FAIL],
      },
    });
    return action;
  };
}


export function checkPassPayBackPass(params, checkedStatus, currentPage, pageSize) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/payback/checkPayBackRecordCheckList',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.CKECK_PASS_PAYBACK_REQUEST, cs.CKECK_PASS_PAYBACK_SUCCESS, cs.CKECK_PASS_PAYBACK_FAIL],
      },
    });
    if (action.payload.data === 'PASS_PAYBACK_SUCCESS') {
      this.getPayBackList({
        checkedStatus: checkedStatus,
        page: currentPage,
        pageSize: pageSize
      })
    }
    if (action.payload.data === 'REJECT_PAYBACK_SUCCESS') {
      this.getPayBackList({
        checkedStatus: checkedStatus,
        page: currentPage,
        pageSize: pageSize
      })
    }
    return action;
  };
}