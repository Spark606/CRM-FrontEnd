import * as cs from '../constants';
import {CALL_API} from '../middlewares/callAPI';

export function getOrderList(params) {
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
          types: [cs.GET_ORDER_LIST_REQUEST, cs.GET_ORDER_LIST_SUCCESS, cs.GET_ORDER_LIST_FAIL],
        },
      });
      return action;
    };
  }


//删除订单
export function deleteOrder(params, orderType, currentPage, pageSize){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/order/deleteOrder',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.DELETE_ONE_ORDER_REQUEST, cs.DELETE_ONE_ORDER_SUCCESS, cs.DELETE_ONE_ORDER_FAIL],
      },
    });
    if(action.type === cs.DELETE_ONE_ORDER_SUCCESS && action.payload) {
      this.getOrderList({
        orderType: orderType,
        page: currentPage,
        pageSize: pageSize,
      })
    }
    return action;
  };
}