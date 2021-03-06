import * as cs from '../constants';
import { message } from 'antd';
import { formatClients, formatRecords, formatClientOrder } from '../actions/base';


const initialState = {
  clientsList: [],
  allClientsList: [],
  oneClientRecord: [],
  oneClientStatus: 1,
  currentPage: 1,
  pageSize: 50,
  pageTotal: 1,
  clientOrdersList: [],
  oneOrderBackList: [],
  selectedRowKeys: [],
  isFetching: false,
  tableIsFetching: false
};
// const layoutReducer = (state = initialState) => state;
export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_CLIENT_SELECTED_KEY':
      return Object.assign({}, state, {
        selectedRowKeys: action.payload,
      });
    case cs.GET_CLIENTS_REQUEST:
      return Object.assign({}, state, {
        tableIsFetching: true
      });
    case cs.GET_CLIENTS_SUCCESS:
      return Object.assign({}, state, {
        clientsList: formatClients(action.payload.data.content),
        pageTotal: parseInt(action.payload.data.totalElements),
        currentPage: parseInt(action.payload.data.number) + 1,
        selectedRowKeys: [],
        tableIsFetching: false,
      });
    case cs.GET_CLIENTS_FAIL:
      return Object.assign({}, state, {
        tableIsFetching: false,
      });


    case cs.GET_CLIENT_RECORDS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_CLIENT_RECORDS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        oneClientRecord: formatRecords(action.payload.data),
      });
    case cs.GET_CLIENT_RECORDS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });



    case cs.UPDATE_ONE_CLIENT_SHARESTATUS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.UPDATE_ONE_CLIENT_SHARESTATUS_SUCCESS:
      message.success('修改资源状态成功！');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.UPDATE_ONE_CLIENT_SHARESTATUS_FAIL:
      message.error('修改资源状态失败！');
      return Object.assign({}, state, {
        isFetching: false,
      });




    case cs.ADD_NEW_CLIENT_RECORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_CLIENT_RECORD_SUCCESS:
      message.success('添加跟进记录成功！');
      return Object.assign({}, state, {
        oneClientRecord: [...formatRecords([action.payload.data]), ...state.oneClientRecord],
        isFetching: false,
      });
    case cs.ADD_NEW_CLIENT_RECORD_FAIL:
      message.error('添加跟进记录失败！');
      return Object.assign({}, state, {
        isFetching: false,
      });


    case cs.ADD_NEW_CLIENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_CLIENT_SUCCESS:
      message.success('新建个人客户成功！');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.ADD_NEW_CLIENT_FAIL:
      if (action.error.code === 88) {
        message.error(action.error.msg);
      } else if (action.error.code === 0 && action.error.data) {
        message.error(action.error.data);
      } else {
        message.error('新建个人客户失败！');
      }
      return Object.assign({}, state, {
        isFetching: false,
      });



    case cs.UPDATE_ONE_CLIENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.UPDATE_ONE_CLIENT_SUCCESS:
      if (action.payload && action.payload.data && action.payload.data.employeeRole === 2) {
        message.success('修改个人客户成功！');
      } else {
        message.success('提交修改个人客户审核记录成功！请耐心等待审核结果。');
      }
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.UPDATE_ONE_CLIENT_FAIL:
      if (action.error.code === 88) {
        message.error(action.error.msg);
      } else if (action.error.code === 0 && action.error.data) {
        message.error(action.error.data);
      } else {
        message.error('修改个人客户失败！');
      }
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.DELETE_ONE_CLIENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.DELETE_ONE_CLIENT_SUCCESS:
      if (action.payload && action.payload.data && action.payload.data.employeeRole === 2) {
        message.success('删除个人客户成功！');
      } else {
        message.success('提交删除个人客户审核记录成功！请耐心等待审核结果。');
      }
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.DELETE_ONE_CLIENT_FAIL:
      message.error('删除个人客户失败！');
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.GET_ALL_CLIENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_ALL_CLIENTS_SUCCESS:
      return Object.assign({}, state, {
        allClientsList: action.payload.data,
        isFetching: false,
      });
    case cs.GET_ALL_CLIENTS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.ADD_NEW_CLIENT_ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_CLIENT_ORDER_SUCCESS:
      message.success('新建个人客户订单成功！');
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.ADD_NEW_CLIENT_ORDER_FAIL:
      message.error('新建个人客户订单失败！');
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.GET_CLIENT_ORDERBACK_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_CLIENT_ORDERBACK_SUCCESS:
      return Object.assign({}, state, {
        oneOrderBackList: action.payload.data,
        isFetching: false,
      });
    case cs.GET_CLIENT_ORDERBACK_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.GET_CLIENT_ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_CLIENT_ORDER_SUCCESS:
      return Object.assign({}, state, {
        clientOrdersList: formatClientOrder(action.payload.data),
        isFetching: false,
      });
    case cs.GET_CLIENT_ORDER_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

      case cs.GET_RESOURCE_EXCEL_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        });
      case cs.GET_RESOURCE_EXCEL_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
        });
      case cs.GET_RESOURCE_EXCEL_FAIL:
        message.error('导出失败！');
        return Object.assign({}, state, {
          isFetching: false,
        });
    default:
      return state;
  }
}
  // export default layoutReducer;
