import jwtDecode from 'jwt-decode';
import * as cs from '../constants';
import { message } from 'antd';

const initialState = {
  isFetching: false,
  newResourceNum: 12,
  recordNum: 200,
  orderSum: 20000,
  orderPaySum: 200000,
  payBackSum: 20000,
  ownPaySum: 30000
};

export default function salaryReducer(state = initialState, action) {
  switch (action.type) {


    case cs.GET_GROSS_STATUS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_GROSS_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.GET_GROSS_STATUS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}
