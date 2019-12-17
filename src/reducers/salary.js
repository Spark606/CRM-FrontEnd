import jwtDecode from 'jwt-decode';

import { findErrorMessage } from '../actions/base';
import * as cs from '../constants';
import { message } from 'antd';

const initialState = {
  isFetching: false,
  employeesSalaryList:  [
    {
      key: 1,
      employeeName: 'John Brown',
      performance: 3200,
      penalty: 123,
      baseSalary: 1000,
      salary: 2330,
      info: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      data: [{
          clientName: '阿里巴巴',
          businessId: '1235676543332222',
          createDate: "2018-12-22",
          orderPaySum: '2000',
        }, {
          clientName: '阿里巴巴',
          businessId: '1235676543332222',
          createDate: "2018-12-22",
          orderPaySum: '2000',
        }, {
          clientName: '阿里巴巴',
          businessId: '1235676543332222',
          createDate: "2018-12-22",
          orderPaySum: '2000',
        }, {
          clientName: '阿里巴巴',
          businessId: '1235676543332222',
          createDate: "2018-12-22",
          orderPaySum: '2000',
        }]
    },
    {
      key: 2,
      employeeName: 'Jim Green',
      performance: 4200,
      penalty: 123,
      baseSalary: 1000,
      salary: 2330,
      info: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
      data: [{
          clientName: '阿里巴巴',
          businessId: '1235676543332222',
          createDate: "2018-12-22",
          orderPaySum: '2000',
        }, {
          clientName: '阿里巴巴',
          businessId: '1235676543332222',
          createDate: "2018-12-22",
          orderPaySum: '2000',
        }, {
          clientName: '阿里巴巴',
          businessId: '1235676543332222',
          createDate: "2018-12-22",
          orderPaySum: '2000',
        }, {
          clientName: '阿里巴巴',
          businessId: '1235676543332222',
          createDate: "2018-12-22",
          orderPaySum: '2000',
        }]
    },
    {
      key: 3,
      employeeName: 'Joe Black',
      performance: 3200,
      penalty: 123,
      baseSalary: 1000,
      salary: 2330,
      info: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      data: [{
          clientName: '阿里巴巴',
          businessId: '1235676543332222',
          createDate: "2018-12-22",
          orderPaySum: '2000',
        }, {
          clientName: '阿里巴巴',
          businessId: '1235676543332222',
          createDate: "2018-12-22",
          orderPaySum: '2000',
        }, {
          clientName: '阿里巴巴',
          businessId: '1235676543332222',
          createDate: "2018-12-22",
          orderPaySum: '2000',
        }, {
          clientName: '阿里巴巴',
          businessId: '1235676543332222',
          createDate: "2018-12-22",
          orderPaySum: '2000',
        }]
    },
  ],
  currentPage: 1,
  pageSize: 10,
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
        employeesSalaryList: action.payload.data.clientSalaryList.content,
        pageTotal: action.payload.data.businessList.totalPages * 2,
        currentPage: action.payload.data.businessList.number + 1,
      });
    case cs.GET_EMPLOYEES_SALARYLIST_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    default:
      return state;
  }
}
