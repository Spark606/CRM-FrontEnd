import * as cs from '../constants';
import {message} from 'antd';

const initialState = {
    clientOrdersList: [],
    firmOrdersList: [],
    currentPage: 1,
    pageSize: 2,
    pageTotal: 1
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case cs.GET_ORDER_LIST_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        });

      case cs.GET_ORDER_LIST_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          clientOrdersList: action.payload.data === 'GET_CLIENT_ORDER_LIST_SUCCESS' ? action.payload.data : [],
          firmOrdersList: action.payload.data === 'GET_CLIENT_ORDER_LIST_SUCCESS' ? action.payload.data : [],
          pageTotal: action.payload.data.totalPages * 2,
          currentPage: action.payload.data.number + 1,
        });
      case cs.GET_ORDER_LIST_FAIL:
        return Object.assign({}, state, {
          isFetching: false,
        });
  
      default:
        return state;
    }
  }