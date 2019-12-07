import * as cs from '../constants';
import { message } from 'antd';
import { formatClientOrder, formatFirmOrder } from '../actions/base';

const initialState = {
  clientOrdersList: [],
  firmOrdersList: [],
  oneOrderBackList: [],
  currentPage: 1,
  pageSize: 2,
  pageTotal: 1,
  orderBackDetail: {}
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case cs.GET_ORDER_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case cs.GET_ORDER_LIST_SUCCESS:
      if (action.payload.data.orderType === 'GET_RESOURCE_BUSINESS_SUCCESS') {
        return Object.assign({}, state, {
          isFetching: false,
          clientOrdersList: formatClientOrder(action.payload.data.businessList.content),
          pageTotal: action.payload.data.businessList.totalPages * 2,
          currentPage: action.payload.data.businessList.number + 1,
        });
      } else if (action.payload.data.orderType === 'GET_COMPANY_BUSINESS_SUCCESS') {
        return Object.assign({}, state, {
          isFetching: false,
          firmOrdersList: formatFirmOrder(action.payload.data.businessList),
          pageTotal: action.payload.data.totalPages * 2,
          currentPage: action.payload.data.page + 1,
        });
      }
    case cs.GET_ORDER_LIST_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.GET_ORDER_BACK_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_ORDER_BACK_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        oneOrderBackList: action.payload.data,
      });
    case cs.GET_ORDER_BACK_LIST_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.DELETE_ONE_ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.DELETE_ONE_ORDER_SUCCESS:
      message.success('删除订单成功！');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.DELETE_ONE_ORDER_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.ADD_NEW_ORDER_BACK_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_ORDER_BACK_SUCCESS:
      message.success('添加回款记录成功！');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.ADD_NEW_ORDER_BACK_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.GET_ORDER_BACK_DETAIL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_ORDER_BACK_DETAIL_SUCCESS:
      const tempDetail = action.payload.data.payBackDetail;
      tempDetail.progressRatio = action.payload.data.progressRatio;
      return Object.assign({}, state, {
        isFetching: false,
        orderBackDetail: action.payload.data ? tempDetail : {}
      });
    case cs.GET_ORDER_BACK_DETAIL_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}