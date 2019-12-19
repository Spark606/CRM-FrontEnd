import jwtDecode from 'jwt-decode';

import { formatEmployeesSalary, formatemployeeSalaryRegulation } from '../actions/base';
import * as cs from '../constants';
import { message } from 'antd';

const initialState = {
  isFetching: false,
  employeesSalaryList: [
    {
      employeeId: 1,
      employeeName: 'John Brown',
      performance: 3200,
      penalty: 123,
      baseSalary: 1000,
      salary: 2330,
      info: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      clientOrderData: [{
        clientName: '阿里巴巴',
        businessId: '1235676543332222',
        createDate: "2018-12-22",
        orderPaySum: '2000',
        curretMonthPayBackSum: '2000',
        owePay: '2000'
      }, {
        clientName: '阿里巴巴',
        businessId: '1235676543332222',
        createDate: "2018-12-22",
        orderPaySum: '2000',
        curretMonthPayBackSum: '2000',
        owePay: '2000'
      }],
      firmOrderData: [{
        clientName: '阿里巴巴',
        businessId: '1235676543332222',
        createDate: "2018-12-22",
        orderPaySum: '2000',
        curretMonthPayBackSum: '2000',
        owePay: '2000'
      }, {
        clientName: '阿里巴巴',
        businessId: '1235676543332222',
        createDate: "2018-12-22",
        orderPaySum: '2000',
        curretMonthPayBackSum: '2000',
        owePay: '2000'
      }]
    },
    {
      employeeId: 2,
      employeeName: 'Jim Green',
      performance: 4200,
      penalty: 123,
      baseSalary: 1000,
      salary: 2330,
      info: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
      clientOrderData: [{
        clientName: '阿里巴巴',
        businessId: '1235676543332222',
        createDate: "2018-12-22",
        orderPaySum: '2000',
        curretMonthPayBackSum: '2000',
        owePay: '2000'
      }, {
        clientName: '阿里巴巴',
        businessId: '1235676543332222',
        createDate: "2018-12-22",
        orderPaySum: '2000',
        curretMonthPayBackSum: '2000',
        owePay: '2000'
      }],
      firmOrderData: [{
        clientName: '阿里巴巴',
        businessId: '1235676543332222',
        createDate: "2018-12-22",
        orderPaySum: '2000',
        curretMonthPayBackSum: '2000',
        owePay: '2000'
      }, {
        clientName: '阿里巴巴',
        businessId: '1235676543332222',
        createDate: "2018-12-22",
        orderPaySum: '2000',
        curretMonthPayBackSum: '2000',
        owePay: '2000'
      }]
    },
  ],
  employeeSalaryRegulation: {
    employeeId: 3,         // 员工ID
    employeeName: 'Liz',         // 员工姓名
    baseSalary: 2000,        // 底薪
    clientSumPay: 2000,        // 人才回款总额
    clientSumPayRatio: 2000,        // 人才提成
    firmSumPay: 2000,        // 企业回款总额
    firmSumPayRatio: 2000,        // 企业提成
    positionSalary: 2000,        // 岗位工资
    positionAge: 2000,        // 工龄
    employeeLeave: 2000,        // 请假
    employeeLate: 2000,        // 迟到
    penalty: 2000,        // 罚款
    bonus: 2000,        // 奖金
    insurance: 2000,        // 社保个人费用
    other: 200,        // 其他
    info: 'xxxxx'        // 备注(说明“其他”)
  },
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
        isFetching: false,
        employeesSalaryList: formatEmployeesSalary(action.payload.data.employeeSalaryList),
        pageTotal: action.payload.data.totalPages * 2,
        currentPage: action.payload.data.curPage,
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
