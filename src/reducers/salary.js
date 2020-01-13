import { formatEmployeesSalary, formatemployeeSalaryRegulation } from '../actions/base';
import * as cs from '../constants';
import { message } from 'antd';

const initialState = {
  isFetching: false,
  employeesSalaryList: [],
  employeeSalaryRegulation: {},
  currentPage: 1,
  pageSize: 50,
  pageTotal: 1,
};

export default function salaryReducer(state = initialState, action) {
  switch (action.type) {


    case cs.GET_EMPLOYEES_SALARYLIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_EMPLOYEES_SALARYLIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        employeesSalaryList: formatEmployeesSalary(action.payload.data.employeeSalaryList),
        pageTotal: parseInt(action.payload.data.totalElements),
        currentPage: parseInt(action.payload.data.curPage),
      });
    case cs.GET_EMPLOYEES_SALARYLIST_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.GET_SALARY_REGULATION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_SALARY_REGULATION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        employeeSalaryRegulation: formatemployeeSalaryRegulation(action.payload.data),
      });
    case cs.GET_SALARY_REGULATION_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.UPDATE_SALARY_REGULATION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.UPDATE_SALARY_REGULATION_SUCCESS:
      return Object.assign({}, state, {
      });
    case cs.UPDATE_SALARY_REGULATION_FAIL:
      message.error('修改员工工资结算失败！');
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}
