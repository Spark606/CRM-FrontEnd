import * as cs from '../constants';
import { CALL_API } from '../middlewares/callAPI';
import { message } from 'antd';

// client page
export function getClients(params) {
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
export function getClientRecordsList(params) {
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
export function addNewClientRecord(params) {
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
        types: [cs.ADD_NEW_CLIENT_RECORD_REQUEST, cs.ADD_NEW_CLIENT_RECORD_SUCCESS, cs.ADD_NEW_CLIENT_RECORD_FAIL],
      },
    });
    return action;
  };
}
export function addNewClient(params, currentPage, pageSize, shareStatus, searchText, searchType, callBack) {
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
    if (action.type === cs.ADD_NEW_CLIENT_SUCCESS) {
      callBack(currentPage, pageSize, shareStatus, searchText, searchType);
    }
    return action;
  };
}
export function updateOneClient(params, currentPage, pageSize, shareStatus, searchText, searchType, callBack) {
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

    if (action.type === cs.UPDATE_ONE_CLIENT_SUCCESS) {
      callBack(currentPage, pageSize, shareStatus, searchText, searchType);
    }
    return action;
  };
}
export function deleteClient(params, currentPage, pageSize, shareStatus, searchText, searchType) {
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
    if (action.type === cs.DELETE_ONE_CLIENT_SUCCESS) {
      this.getClients({
        searchText: searchText,
        searchType: searchType,
        shareStatus: shareStatus,
        page: currentPage,
        pageSize: pageSize,
      });
    }
    return action;
  };
}

export function getAllClients() {
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

export function addNewClientOrder(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/business/createResourceBusiness',
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

export function updateClientShareStatus(params, shareStatus, pageSize, searchText, searchType) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/updateResourceShareStatus',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.UPDATE_ONE_CLIENT_SHARESTATUS_REQUEST, cs.UPDATE_ONE_CLIENT_SHARESTATUS_SUCCESS, cs.UPDATE_ONE_CLIENT_SHARESTATUS_FAIL],
      },
    });

    if (action.type === cs.UPDATE_ONE_CLIENT_SHARESTATUS_SUCCESS) {
      this.getClients({
        searchText: searchText,
        searchType: searchType,
        shareStatus: shareStatus,
        page: 1,
        pageSize: pageSize,
      });
    }
    return action;
  };
}

export function getClientOrder(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/business/getResourceBusinessListByResourceId',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_CLIENT_ORDER_REQUEST, cs.GET_CLIENT_ORDER_SUCCESS, cs.GET_CLIENT_ORDER_FAIL],
      },
    });
    return action;
  };
}

export function getClientOrderBack(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/payback/getPayBackRecordListByResourceId',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_CLIENT_ORDERBACK_REQUEST, cs.GET_CLIENT_ORDERBACK_SUCCESS, cs.GET_CLIENT_ORDERBACK_FAIL],
      },
    });
    return action;
  };
}


export function downloadResourceExcel() {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/upload/downloadResourceFile',
        method: 'GET',
        // responseType: 'blob',
        responseType: 'arraybuffer',
        header: {
          'Content-Type': 'application/octet-stream',
        },
        timeout: 3000,
        types: [cs.GET_RESOURCE_EXCEL_REQUEST, cs.GET_RESOURCE_EXCEL_SUCCESS, cs.GET_RESOURCE_EXCEL_FAIL],
      },
    });
    if (action.type === cs.GET_RESOURCE_EXCEL_SUCCESS) {
      const content = action.paylod.data;
      const blob = new Blob([content])
      const fileName = '个人客户.xls'
      if ('download' in document.createElement('a')) { // 非IE下载
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName)
      }
    }
    return action;
  };
}

export function changeSelectedKeys(params) {
  return {
    type: 'CHANGE_CLIENT_SELECTED_KEY',
    payload: params
  };
}