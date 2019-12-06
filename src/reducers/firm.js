import * as cs from '../constants';
import { message } from 'antd';

import { formatFirms, formatRecords } from '../actions/base';

const initialState = {
  firmsList: [],
  allFirmsList: [],
  currentPage: 1,
  oneFirmRecord: [],
  currentPage: 1,
  pageSize: 2,
  pageTotal: 1
};

export default function firmReducer(state = initialState, action) {
  switch (action.type) {
    case cs.GET_FIRMS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_FIRMS_SUCCESS:
      return Object.assign({}, state, {
        firmsList: action.payload ? formatFirms(action.payload.data.content) : [],
        pageTotal: action.payload.data.totalPages * 2,
        currentPage: action.payload.data.number + 1,
        isFetching: false,
      });
    case cs.GET_FIRMS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });


    case cs.GET_FIRM_RECORDS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_FIRM_RECORDS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        oneFirmRecord: action.payload.data ? formatRecords(action.payload.data) : [],
      });
    case cs.GET_FIRM_RECORDS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });


    case cs.ADD_NEW_FIRM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_FIRM_SUCCESS:
      message.success('新建企业客户成功！');
      return Object.assign({}, state, {
        isFetching: false,
        firmsList: action.payload ? [...formatFirms([action.payload.data]), ...state.firmsList] : state.firmsList,
      });
    case cs.ADD_NEW_FIRM_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.UPDATE_ONE_FIRM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.UPDATE_ONE_FIRM_SUCCESS:
      if (action.payload.data && action.payload.data && action.payload.data.employeeRole === 2) {
        message.success('修改企业客户成功！');
      } else {
        message.success('提交修改企业客户审核记录成功！请耐心等待审核结果。');
      }
      const updateFirmTemp = state.firmsList.map(e => {
        if (e.firmId === action.payload.data.company.companyId) {
          return formatFirms([action.payload.data.company])[0];
        }
        return e;
      })
      return Object.assign({}, state, {
        isFetching: false,
        firmsList: action.payload.data.employeeRole === 2 ? updateFirmTemp : [...state.firmsList]
      });
    case cs.UPDATE_ONE_FIRM_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.DELETE_ONE_FIRM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.DELETE_ONE_FIRM_SUCCESS:
      if (action.payload.data && action.payload.data && action.payload.data.employeeRole === 2) {
        message.success('删除企业客户成功！');
      } else {
        message.success('提交删除企业客户审核记录成功！请耐心等待审核结果。');
      }
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.DELETE_ONE_FIRM_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.ADD_NEW_FIRM_RECORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_FIRM_RECORD_SUCCESS:
      message.success('添加跟进记录成功！');
      return Object.assign({}, state, {
        oneFirmRecord: action.payload ? [...formatRecords([action.payload.data]), ...state.oneFirmRecord] : state.oneFirmRecord,
        isFetching: false,
      });
    case cs.ADD_NEW_FIRM_RECORD_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });


    case cs.GET_ALL_FIRMS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_ALL_FIRMS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        allFirmsList: action.payload.data
      });
    case cs.GET_ALL_FIRMS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });


    case cs.ADD_NEW_FIRM_ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_FIRM_ORDER_SUCCESS:
      message.success('新建企业客户订单成功！');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.ADD_NEW_FIRM_ORDER_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });
    // case cs.GET_FIRMS_REQUEST:
    //     return Object.assign({}, state, {
    //         isFetching: true
    //     });
    // case cs.GET_FIRMS_SUCCESS:
    //     return Object.assign({}, state, {
    //         isFetching: false,
    //     });
    // case cs.GET_FIRMS_FAIL:
    //     return Object.assign({}, state, {
    //         isFetching: false,
    //     });
    default:
      return state;
  }
}
  // export default layoutReducer;
