import * as cs from '../constants';
import { message } from 'antd';

import { formatFirms, formatRecords, formatFirmOrder } from '../actions/base';

const initialState = {
  firmsList: [],
  allFirmsList: [],
  currentPage: 1,
  oneFirmRecord: [],
  pageSize: 50,
  pageTotal: 1,
  firmOrdersList: [],
  oneOrderBackList: [],
  selectedRowKeys: [],
  tableIsFetching: false
};

export default function firmReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_FIRM_SELECTED_KEY':
      return Object.assign({}, state, {
        selectedRowKeys: action.payload,
      });
    case cs.GET_FIRMS_REQUEST:
      return Object.assign({}, state, {
        tableIsFetching: true
      });
    case cs.GET_FIRMS_SUCCESS:
      return Object.assign({}, state, {
        firmsList: action.payload ? formatFirms(action.payload.data.content) : [],
        pageTotal: parseInt(action.payload.data.totalElements),
        currentPage: parseInt(action.payload.data.number) + 1,
        tableIsFetching: false,
        selectedRowKeys: [],
      });
    case cs.GET_FIRMS_FAIL:
      return Object.assign({}, state, {
        tableIsFetching: false,
      });


      case cs.UPDATE_ONE_FIRM_SHARESTATUS_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        });
      case cs.UPDATE_ONE_FIRM_SHARESTATUS_SUCCESS:
        message.success('修改资源状态成功！');
        return Object.assign({}, state, {
          isFetching: false,
        });
      case cs.UPDATE_ONE_FIRM_SHARESTATUS_FAIL:
        message.error('修改资源状态失败！');
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
      message.error('新建企业客户失败！');
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.UPDATE_ONE_FIRM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.UPDATE_ONE_FIRM_SUCCESS:
      if (action.payload && action.payload.data && action.payload.data.employeeRole === 2) {
        message.success('修改企业客户成功！');
      } else {
        message.success('提交修改企业客户审核记录成功！请耐心等待审核结果。');
      }
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.UPDATE_ONE_FIRM_FAIL:
      message.error('修改企业客户失败！');
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.DELETE_ONE_FIRM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.DELETE_ONE_FIRM_SUCCESS:
      if (action.payload && action.payload.data && action.payload.data.employeeRole === 2) {
        message.success('删除企业客户成功！');
      } else {
        message.success('提交删除企业客户审核记录成功！请耐心等待审核结果。');
      }
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.DELETE_ONE_FIRM_FAIL:
      message.error('删除企业客户失败！');
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
        oneFirmRecord:  [...formatRecords([action.payload.data]), ...state.oneFirmRecord],
        isFetching: false,
      });
    case cs.ADD_NEW_FIRM_RECORD_FAIL:
      message.error('添加跟进记录失败！');
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
      message.error('新建企业客户订单失败！');
      return Object.assign({}, state, {
        isFetching: false,
      });

      case cs.GET_FIRM_ORDERBACK_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        });
      case cs.GET_FIRM_ORDERBACK_SUCCESS:
        return Object.assign({}, state, {
          oneOrderBackList: action.payload.data,
          isFetching: false,
        });
      case cs.GET_FIRM_ORDERBACK_FAIL:
        return Object.assign({}, state, {
          isFetching: false,
        });
  
      case cs.GET_FIRM_ORDER_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        });
      case cs.GET_FIRM_ORDER_SUCCESS:
        return Object.assign({}, state, {
          firmOrdersList: formatFirmOrder(action.payload.data),
          isFetching: false,
        });
      case cs.GET_FIRM_ORDER_FAIL:
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
