import jwtDecode from 'jwt-decode';

import { findErrorMessage } from '../actions/base';
import * as cs from '../constants';

const initialState = {
  isFetching: false,
  user_name: null,
  user_role: 1,
  user_Id: null,
  error: false,
  loginMsg: {},
  regMsg: {},
  userMsg: {},
  id: null,
  user_email: null,
  user_phonenumber: null,
  employeeList: [],
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case cs.GET_USER_MSG_FROM_SESSION:
      return Object.assign({}, state, {
        isFetching: false,
        user_name: action.payload.user_name,
        user_role: action.payload.user_role,
        user_Id: action.payload.user_Id,
      });

    case cs.GET_USER_MSG_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_USER_MSG_SUCCESS:
      console.log(action.payload);
      return Object.assign({}, state, {
        isFetching: false,
        user_name: action.payload.data.user_name,
        user_role: action.payload.data.user_role,
        user_Id: action.payload.data.user_Id,
        user_email: action.payload.data.user_email,
        user_phonenumber: action.payload.data.user_phonenumber,
      });
      case cs.GET_USER_MSG_FAIL:
        return Object.assign({}, state, {
          isFetching: false,
        });
  

    case cs.LOGIN_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case cs.LOGIN_SUCCESS: console.log();
      return Object.assign({}, state, {
        isFetching: false,
        token: action.payload.data.token,
        user_name: action.payload.data.user_name,
        user_Id: action.payload.data.user_Id,
        user_role: action.payload.data.user_role
      });
    case cs.LOGIN_FAIL:
      return Object.assign({}, state, {
        error: true,
        isFetching: false,
        errorMessage: findErrorMessage(action.error.code)
      });

    case cs.UPDATE_TOKEN_REQUEST:
      return Object.assign({}, state, { error: false, isFetching: true });
    case cs.UPDATE_TOKEN_SUCCESS:
      // console.log(decodeSessions);
      return Object.assign({}, state, {
        isFetching: false,
        token: action.payload.token
      });
    case cs.UPDATE_TOKEN_FAIL:
      return Object.assign({}, state, {
        error: true,
        isFetching: false,
        errorMessage: findErrorMessage(action.error.code)
      });

    case cs.REG_REQUEST:
      return Object.assign({}, state, { error: false, isFetching: true });
    case cs.REG_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.payload.userMsg,
        token: action.payload.token,
      });
    case cs.REG_FAIL:
      return Object.assign({}, state, {
        error: true,
        isFetching: false,
        errorMessage: findErrorMessage(action.error.code)
      });


    case cs.UPDATE_USER_INFORMATION_REQUEST:
      return Object.assign({}, state, { error: false, isFetching: true });
    case cs.UPDATE_USER_INFORMATION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        user_name: action.payload.data.user_name,
        user_phonenumber: action.payload.data.user_phonenumber,
        user_email: action.payload.data.user_email,
      });
    case cs.UPDATE_USER_INFORMATION_FAIL:
      return Object.assign({}, state, {
        error: true,
        isFetching: false,
        errorMessage: findErrorMessage(action.error.code)
      });

      
    case cs.GET_EMPLOYEE_LIST_REQUEST:
        return Object.assign({}, state, { error: false, isFetching: true });
      case cs.GET_EMPLOYEE_LIST_SUCCESS:
        console.log(action.payload);
        return Object.assign({}, state, {
          isFetching: false,
          employeeList: action.payload.data
        });
      case cs.GET_EMPLOYEE_LIST_FAIL:
        return Object.assign({}, state, {
          isFetching: false,
        });
    case cs.LOGOUT:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
