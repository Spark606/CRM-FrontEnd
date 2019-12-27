import * as cs from '../constants';
import { message } from 'antd';

const initialState = {
  employeeTree: [],
  selectedEmployee: {},
  managerEmployeeList: []
};

export default function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case cs.GET_EMPLOYEE_TREE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_EMPLOYEE_TREE_SUCCESS:
      return Object.assign({}, state, {
        employeeTree: action.payload.data,
        isFetching: false
      });
    case cs.GET_EMPLOYEE_TREE_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });


    case cs.GET_EMPLOYEE_DETAIL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_EMPLOYEE_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        selectedEmployee: action.payload.data,
        isFetching: false
      });
    case cs.GET_EMPLOYEE_DETAIL_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.GET_MANAGER_EMPLOYEE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_MANAGER_EMPLOYEE_SUCCESS:
      return Object.assign({}, state, {
        managerEmployeeList: action.payload.data,
        isFetching: false
      });
    case cs.GET_MANAGER_EMPLOYEE_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.ADD_NEW_EMPLOYEE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_EMPLOYEE_SUCCESS:
      message.success('新建员工成功！');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.ADD_NEW_EMPLOYEE_FAIL:
      message.error('新建员工失败！');
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.UPDATE_EMPLOYEE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.UPDATE_EMPLOYEE_SUCCESS:
      message.success('修改员工成功！');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.UPDATE_EMPLOYEE_FAIL:
      message.error('修改员工失败！');
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.DELETE_EMPLOYEE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.DELETE_EMPLOYEE_SUCCESS:
        message.success('删除员工成功!');
        return Object.assign({}, state, {
          isFetching: false,
        });
    case cs.DELETE_EMPLOYEE_FAIL:
        message.success('删除员工失败!');
        return Object.assign({}, state, {
          isFetching: false,
        });

    default:
      return state;
  }
}
  // export default layoutReducer;
