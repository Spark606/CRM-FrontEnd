import * as cs from '../constants';
import { CALL_API } from '../middlewares/callAPI';

export function getOrderList(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/business/getBusinessList',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_ORDER_LIST_REQUEST, cs.GET_ORDER_LIST_SUCCESS, cs.GET_ORDER_LIST_FAIL],
      },
    });
    return action;
  };
}

export function getOrderBackList(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/payback/getPayBackRecordListByBusinessId',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_ORDER_BACK_LIST_REQUEST, cs.GET_ORDER_BACK_LIST_SUCCESS, cs.GET_ORDER_BACK_LIST_FAIL],
      },
    });
    return action;
  };
}


export function addNewOrderBack(params, callBack){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/payback/createPayBackRecord',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs. ADD_NEW_ORDER_BACK_REQUEST, cs. ADD_NEW_ORDER_BACK_SUCCESS, cs. ADD_NEW_ORDER_BACK_FAIL],
      },
    });
    if (action.type === cs.ADD_NEW_ORDER_BACK_SUCCESS) {
      callBack();
    }
    return action;
  };
}

export function getOrderBackDetail(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/payback/getPayBackRecordDetailByBusinessId',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_ORDER_BACK_DETAIL_REQUEST, cs.GET_ORDER_BACK_DETAIL_SUCCESS, cs.GET_ORDER_BACK_DETAIL_FAIL],
      },
    });
    return action;
  };
}

