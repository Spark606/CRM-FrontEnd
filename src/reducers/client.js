import * as cs from '../constants';
import { message } from 'antd';
import _ from 'lodash';
import { formatClients, formatRecords } from '../actions/base';


const initialState = {
  clientsList: [],
  oneClientRecord: [],
  oneClientStatus: 1,
  currentPage: 1,
  pageSize: 2,
  pageTotal: 10
};
// const layoutReducer = (state = initialState) => state;
export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case cs.GET_CLIENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_CLIENTS_SUCCESS:
      console.log(action.payload.data.number);
      return Object.assign({}, state, {
        clientsList: formatClients(action.payload.data.content),
        pageTotal: action.payload.data.totalPages * 2,
        currentPage: action.payload.data.number + 1,
        isFetching: false,
      });
    case cs.GET_CLIENTS_FAIL:
      return Object.assign({}, state, {
        clientsList: formatClients(data),
        isFetching: false,
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
        clientsList: action.payload ? [...formatClients([{
          resourceId: 20,
          shareStatus: "private",
          resourceName: '傻bobo',
          certificate: '一级房建转加造价初',
          info: 'London No. 2 Lake Park',
          createDate: '2012-12-11',
          endDate: '2020-12-24',
          status: 1,
          phone: '17844537359',
          qq: '1105394023',
          employeeName: 'Liz',
          province: '四川',
          gender: 1,
          email: 'lizbaby606@163.com',
        }]), ...state.clientsList] : state.clientsList
      });
    case cs.ADD_NEW_CLIENT_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        clientsList: [...formatClients([{
          resourceId: 20,
          shareStatus: "private",
          resourceName: '傻bobo',
          certificate: '一级房建转加造价初',
          info: 'London No. 2 Lake Park',
          createDate: '2012-12-11',
          endDate: '2020-12-24',
          status: 1,
          phone: '17844537359',
          qq: '1105394023',
          employeeName: 'Liz',
          province: '四川',
          gender: 1,
          email: 'lizbaby606@163.com',
        }]), ...state.clientsList]
      });



    case cs.UPDATE_ONE_CLIENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.UPDATE_ONE_CLIENT_SUCCESS:
      if (action.payload.data.employeeRole === 2) {
        message.success('修改个人客户成功！');
      } else {
        message.success('提交修改个人客户审核记录成功！请耐心等待审核结果。');
      }
      const updateClientTemp = state.clientsList.map(e => {
        if (e.clientId === action.payload.data.resource.resourceId) {
          return formatClients([action.payload.data.resource])[0];
        }
        return e;
      })
      return Object.assign({}, state, {
        isFetching: false,
        clientsList: action.payload.data.employeeRole === 2 ? updateClientTemp : [...state.clientsList]
      });
    case cs.UPDATE_ONE_CLIENT_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.DELETE_ONE_CLIENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.DELETE_ONE_CLIENT_SUCCESS:
      if (action.payload.data.employeeRole === 2) {
        message.success('删除个人客户成功！');
      } else {
        message.success('提交删除个人客户审核记录成功！请耐心等待审核结果。');
      }
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.DELETE_ONE_CLIENT_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    // case cs.GET_CLIENTS_REQUEST:
    //     return Object.assign({}, state, {
    //         isFetching: true
    //     });
    // case cs.GET_CLIENTS_SUCCESS:
    //     return Object.assign({}, state, {
    //         isFetching: false,
    //     });
    // case cs.GET_CLIENTS_FAIL:
    //     return Object.assign({}, state, {
    //         isFetching: false,
    //     });
    default:
      return state;
  }
}
  // export default layoutReducer;
